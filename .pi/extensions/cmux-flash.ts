/**
 * CMUX Flash Extension
 * 
 * Adds a "flash" tool to get user's attention via cmux flash notification.
 * 
 * Usage: The agent calls `flash` tool when it needs user attention
 * (asking questions, waiting for feedback, task complete, etc.)
 * 
 * The terminal window will flash to get attention even in multi-tab setups.
 */
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { execSync } from "child_process";
import { readFileSync } from "fs";

interface CmuxIdentify {
  focusedWindow?: string;
  focusedWorkspace?: string;
  focusedPane?: string;
  focusedSurface?: string;
}

function getCmuxContext(): CmuxIdentify | null {
  try {
    const output = execSync("cmux identify --json", { encoding: "utf-8", stdio: "pipe" });
    return JSON.parse(output);
  } catch {
    return null;
  }
}

function flashSurface(surfaceRef: string) {
  try {
    execSync(`cmux trigger-flash --surface ${surfaceRef}`, { encoding: "utf-8", stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function flashWorkspace(workspaceRef: string) {
  try {
    execSync(`cmux trigger-flash --workspace ${workspaceRef}`, { encoding: "utf-8", stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

export default function (pi: ExtensionAPI) {
  // Identify cmux context on startup
  const cmuxContext = getCmuxContext();

  if (!cmuxContext) {
    console.log("[cmux-flash] cmux not detected, flash tool not registered");
    return;
  }

  const targetSurface = cmuxContext.focusedSurface || "surface:0";
  const targetWorkspace = cmuxContext.focusedWorkspace || "workspace:0";

  console.log(`[cmux-flash] Registered for surface: ${targetSurface}`);

  // Register the flash tool
  pi.registerTool({
    name: "flash",
    label: "Flash Window",
    description: "Flash the terminal window to get user attention. Use when asking questions, waiting for feedback, or when user needs to be notified.",
    promptSnippet: "Flash terminal window for user attention",
    promptGuidelines: [
      "Use this tool when you need to get the user's attention",
      "Call this when asking a question that requires user input",
      "Call this when waiting for user confirmation or feedback",
      "Call this when a task completes and user should be notified"
    ],
    parameters: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "Optional message describing why flash is triggered"
        }
      },
      required: []
    },

    async execute(_toolCallId, params) {
      const message = params?.message || "Needs your attention";

      // Try surface flash first (more precise)
      let success = flashSurface(targetSurface);

      // Fallback to workspace flash
      if (!success) {
        success = flashWorkspace(targetWorkspace);
      }

      if (success) {
        return {
          content: [{ type: "text", text: `🔔 Flash notification sent: ${message}` }],
          details: { surface: targetSurface, message }
        };
      } else {
        return {
          content: [{ type: "text", text: `⚠️ Could not trigger flash (cmux may not be running)` }],
          details: { error: "flash_failed" }
        };
      }
    }
  });

  // Notify on session start
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify(`🔔 CMUX Flash ready (target: ${targetSurface})`, "info");
  });
}
