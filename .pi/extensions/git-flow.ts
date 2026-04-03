/**
 * Git Flow Extension
 *
 * Enforces git flow workflow:
 * - Blocks direct commits to main/master
 * - Requires feature branch naming (feature/*, fix/*, chore/*)
 * - Enforces conventional commit messages
 * - Warns when working on protected branches
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const PROTECTED_BRANCHES = ["main", "master", "develop", "staging", "production"];
const VALID_PREFIXES = ["feature/", "fix/", "hotfix/", "chore/", "refactor/", "docs/", "test/"];
const COMMIT_PREFIXES = ["feat:", "fix:", "chore:", "refactor:", "docs:", "test:", "style:", "perf:", "ci:", "build:"];

export default function (pi: ExtensionAPI) {
  // Check current branch on session start
  pi.on("session_start", async (_event, ctx) => {
    const branch = await getCurrentBranch(pi);
    if (branch && isProtected(branch)) {
      ctx.ui.notify(`⚠️ On protected branch: ${branch}. Create a feature branch first.`, "warning");
    }
  });

  // Intercept git commands
  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName !== "bash") return;

    const cmd = event.input.command || "";

    // Check for git commit
    if (cmd.match(/\bgit\s+commit\b/)) {
      const branch = await getCurrentBranch(pi);

      // Block commits to protected branches
      if (branch && isProtected(branch)) {
        const ok = await ctx.ui.confirm(
          "🚫 Protected Branch",
          `Cannot commit directly to '${branch}'.\n\nCreate a feature branch first?`
        );
        if (ok) {
          const branchName = await ctx.ui.input("Branch name (e.g., feature/my-feature)");
          if (branchName) {
            const prefix = branchName.includes("/") ? "" : "feature/";
            await pi.exec("git", ["checkout", "-b", `${prefix}${branchName}`]);
            ctx.ui.notify(`✅ Created branch: ${prefix}${branchName}`, "success");
            return; // Let them retry the commit
          }
        }
        return { block: true, reason: "Cannot commit to protected branch" };
      }

      // Validate commit message format
      const messageMatch = cmd.match(/-m\s+["']?([^"']+)["']?/);
      if (messageMatch) {
        const message = messageMatch[1];
        if (!isValidCommitMessage(message)) {
          const ok = await ctx.ui.confirm(
            "⚠️ Commit Message Format",
            `Message should start with a prefix:\n${COMMIT_PREFIXES.join(", ")}\n\nYour message: "${message}"\n\nProceed anyway?`
          );
          if (!ok) {
            return { block: true, reason: "Invalid commit message format" };
          }
        }
      }
    }

    // Check for git push to protected branches
    if (cmd.match(/\bgit\s+push\b/)) {
      const branch = await getCurrentBranch(pi);
      if (branch && isProtected(branch)) {
        const ok = await ctx.ui.confirm(
          "🚫 Protected Branch",
          `Push directly to '${branch}'?\n\nThis is usually not recommended. Continue?`
        );
        if (!ok) {
          return { block: true, reason: "Push to protected branch blocked" };
        }
      }
    }

    // Check for git checkout/switch
    if (cmd.match(/\bgit\s+(checkout|switch)\s+/)) {
      const targetBranch = cmd.match(/\bgit\s+(?:checkout|switch)\s+([^\s]+)/)?.[1];
      if (targetBranch && isProtected(targetBranch)) {
        ctx.ui.notify(`⚠️ Switching to protected branch: ${targetBranch}`, "warning");
      }
    }
  });

  // Register commands
  pi.registerCommand("branch", {
    description: "Create a new feature branch",
    handler: async (args, ctx) => {
      const branchName = args || await ctx.ui.input("Branch name (e.g., feature/my-feature)");
      if (!branchName) return;

      const prefix = branchName.includes("/") ? "" : "feature/";
      const fullBranch = `${prefix}${branchName}`;

      try {
        await pi.exec("git", ["checkout", "-b", fullBranch]);
        ctx.ui.notify(`✅ Created branch: ${fullBranch}`, "success");
      } catch (error) {
        ctx.ui.notify(`❌ Failed to create branch: ${error.message}`, "error");
      }
    },
  });

  pi.registerCommand("git-status", {
    description: "Show git status and branch info",
    handler: async (_args, ctx) => {
      const branch = await getCurrentBranch(pi);
      const { stdout } = await pi.exec("git", ["status", "--short"]);

      const status = stdout.trim() || "Clean working tree";
      const protection = branch && isProtected(branch) ? " (protected)" : "";

      ctx.ui.notify(`📍 ${branch}${protection}\n${status}`, "info");
    },
  });
}

// Helper functions
async function getCurrentBranch(pi: ExtensionAPI): Promise<string | null> {
  try {
    const { stdout, code } = await pi.exec("git", ["branch", "--show-current"]);
    return code === 0 ? stdout.trim() : null;
  } catch {
    return null;
  }
}

function isProtected(branch: string): boolean {
  return PROTECTED_BRANCHES.includes(branch);
}

function isValidCommitMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return COMMIT_PREFIXES.some(prefix => lowerMessage.startsWith(prefix));
}
