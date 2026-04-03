/**
 * Commit Extension - Check and fix issues, then commit
 *
 * INSTRUCTIONS:
 * 1. Check and fix linting issues
 * 2. Check and fix TypeScript type issues
 * 3. Check and fix any build related issues
 * 4. Check and fix any formatting related issues
 * 5. Ignore unwanted and temporary files (test files, screenshots, build output, etc.)
 * 6. If everything is okay, commit the changes following git flow methodology
 *
 * Use /commit to run all checks and commit
 */
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { execSync } from "child_process";

// Detect package manager from project
function detectPackageManager(): { name: string; run: (script: string) => string; install: (pkg: string) => string } {
  const lockFiles = [
    { file: "pnpm-lock.yaml", name: "pnpm", run: (s) => `pnpm run ${s}`, install: (p) => `pnpm add ${p}` },
    { file: "bun.lockb", name: "bun", run: (s) => `bun run ${s}`, install: (p) => `bun add ${p}` },
    { file: "yarn.lock", name: "yarn", run: (s) => `yarn ${s}`, install: (p) => `yarn add ${p}` },
    { file: "package-lock.json", name: "npm", run: (s) => `npm run ${s}`, install: (p) => `npm install ${p}` },
  ];

  for (const lock of lockFiles) {
    try {
      execSync(`test -f ${lock.file}`, { encoding: "utf-8", stdio: "pipe" });
      return lock;
    } catch {
      // Lock file not found
    }
  }

  // Default to npm
  return { name: "npm", run: (s) => `npm run ${s}`, install: (p) => `npm install ${p}` };
}

export default function (pi: ExtensionAPI) {
  const pkg = detectPackageManager();

  pi.registerCommand("commit", {
    description: `Check lint, types, build, format - then commit if all pass (using ${pkg.name})`,
    handler: async (_args, ctx) => {
      const steps = [
        { name: "Linting", cmd: pkg.run("lint"), fixCmd: pkg.run("lint:fix") },
        { name: "TypeScript", cmd: pkg.run("typecheck"), fixCmd: null },
        { name: "Build", cmd: pkg.run("build"), fixCmd: null },
        { name: "Format", cmd: pkg.run("format:check"), fixCmd: pkg.run("format") },
      ];

      ctx.ui.notify(`🔍 Running pre-commit checks (${pkg.name})...\n`, "info");

      let allPassed = true;

      for (const step of steps) {
        ctx.ui.notify(`Checking ${step.name}...`, "info");

        try {
          execSync(step.cmd, { encoding: "utf-8", stdio: "pipe" });
          ctx.ui.notify(`✅ ${step.name} passed`, "success");
        } catch (error) {
          allPassed = false;

          if (step.fixCmd) {
            ctx.ui.notify(`⚠️ ${step.name} issues found. Fixing...`, "warning");
            try {
              execSync(step.fixCmd, { encoding: "utf-8", stdio: "pipe" });
              ctx.ui.notify(`✅ ${step.name} fixed`, "success");
            } catch {
              ctx.ui.notify(`❌ ${step.name} could not be auto-fixed`, "error");
            }
          } else {
            ctx.ui.notify(`❌ ${step.name} failed. Please fix manually.`, "error");
          }
        }
      }

      if (!allPassed) {
        ctx.ui.notify("\n⚠️ Some checks failed. Please fix issues and run /commit again.", "warning");
        return;
      }

      // All checks passed - proceed with commit
      ctx.ui.notify("\n✅ All checks passed!", "success");

      // Get current branch
      const branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }).trim();

      // Get all changed files
      const stagedFiles = execSync("git diff --cached --name-only", { encoding: "utf-8" }).trim();
      const unstagedFiles = execSync("git diff --name-only", { encoding: "utf-8" }).trim();
      const untrackedFiles = execSync("git ls-files --others --exclude-standard", { encoding: "utf-8" }).trim();

      // Combine all files
      const allFiles = [
        ...stagedFiles.split("\n"),
        ...unstagedFiles.split("\n"),
        ...untrackedFiles.split("\n"),
      ].filter(Boolean);

      if (allFiles.length === 0) {
        ctx.ui.notify("ℹ️ No changes to commit.", "info");
        return;
      }

      // Show all files and ask which to ignore
      ctx.ui.notify(`\n📁 Found ${allFiles.length} changed files:\n`, "info");

      // Filter out unwanted/temporary files based on patterns
      const unwantedPatterns = [
        /\.ai\//i,           // AI temporary directory
        /screenshot/i,
        /test-frame/i,
        /\.DS_Store/i,
        /\.tmp$/i,
        /\.log$/i,
        /^build\//i,
        /^dist\//i,
        /^out\//i,
        /^tasks\//i,
        /^tmp\//i,
        /^temp\//i,
        /^node_modules\//i,
        /\.env\./i,
      ];

      const filesToCommit = allFiles.filter((file) => {
        const isUnwanted = unwantedPatterns.some((pattern) => pattern.test(file));
        if (isUnwanted) {
          ctx.ui.notify(`  ⏭️  ${file} (ignoring)`, "info");
        }
        return !isUnwanted;
      });

      const ignoredCount = allFiles.length - filesToCommit.length;

      if (filesToCommit.length === 0) {
        ctx.ui.notify("\nℹ️ No files to commit after ignoring temp files.", "info");
        return;
      }

      ctx.ui.notify(`\n📝 Files to commit (${filesToCommit.length}):`, "info");
      filesToCommit.forEach((f) => ctx.ui.notify(`  ✅ ${f}`, "info"));

      if (ignoredCount > 0) {
        ctx.ui.notify(`\n⏭️  Ignored ${ignoredCount} temporary/test files`, "warning");
      }

      // Stage the files
      const confirmed = await ctx.ui.confirm("\nStage and commit these files?", true);

      if (!confirmed) {
        ctx.ui.notify("Commit cancelled.", "info");
        return;
      }

      // Stage files
      for (const file of filesToCommit) {
        try {
          execSync(`git add "${file}"`, { encoding: "utf-8" });
        } catch {
          // Skip files that can't be added
        }
      }

      // Generate commit message
      const commitMessage = generateCommitMessage(filesToCommit, branch);

      ctx.ui.notify(`\n📝 Commit message:\n\n${commitMessage}\n`, "info");

      const commitConfirmed = await ctx.ui.confirm("Commit with this message?", true);

      if (commitConfirmed) {
        try {
          execSync(`git commit -m "${commitMessage}"`, { encoding: "utf-8" });
          ctx.ui.notify(`✅ Committed to ${branch}`, "success");
        } catch (error) {
          ctx.ui.notify(
            `❌ Commit failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            "error"
          );
        }
      } else {
        const customMessage = await ctx.ui.prompt("Enter custom commit message:", commitMessage);
        if (customMessage) {
          try {
            execSync(`git commit -m "${customMessage}"`, { encoding: "utf-8" });
            ctx.ui.notify(`✅ Committed to ${branch}`, "success");
          } catch (error) {
            ctx.ui.notify(
              `❌ Commit failed: ${error instanceof Error ? error.message : "Unknown error"}`,
              "error"
            );
          }
        }
      }
    },
  });
}

function generateCommitMessage(files: string[], branch: string): string {
  // Infer type from branch name (git flow)
  let type = "chore";
  if (branch.startsWith("feature/") || branch.startsWith("feat/")) type = "feat";
  else if (branch.startsWith("bugfix/") || branch.startsWith("fix/")) type = "fix";
  else if (branch.startsWith("hotfix/")) type = "fix";
  else if (branch.startsWith("release/")) type = "chore";
  else if (branch.startsWith("docs/")) type = "docs";

  // Infer scope from files
  let scope = "";

  const srcMatch = files.find((f) => f.includes("src/"));
  if (srcMatch) {
    const match = srcMatch.match(/src\/([^/]+)/);
    if (match) scope = match[1];
  } else if (files.some((f) => f.includes(".pi/"))) {
    scope = "pi";
  }

  // Generate description
  let description = "";
  if (files.length === 1) {
    const fileName = files[0].split("/").pop()?.replace(/\.[^.]+$/, "") || files[0];
    description = `update ${fileName}`;
  } else {
    description = `update ${files.length} files`;
  }

  const scopePart = scope ? `(${scope})` : "";
  return `${type}${scopePart}: ${description}`;
}
