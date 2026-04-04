import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Echo tool — returns the input message.
 * Useful for testing that your MCP server is working.
 */
export function echoTool(server: McpServer): void {
  server.tool(
    "echo",
    "Echo back the input message. Use this to test the MCP connection.",
    {
      message: z.string().describe("The message to echo back"),
    },
    async ({ message }) => ({
      content: [
        {
          type: "text" as const,
          text: `Echo: ${message}`,
        },
      ],
    })
  );
}
