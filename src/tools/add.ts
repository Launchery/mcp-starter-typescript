import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Add tool — sums two numbers.
 * Simple example of a tool with numeric input and computed output.
 */
export function addTool(server: McpServer): void {
  server.tool(
    "add",
    "Add two numbers together and return the result.",
    {
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    },
    async ({ a, b }) => ({
      content: [
        {
          type: "text" as const,
          text: `${a} + ${b} = ${a + b}`,
        },
      ],
    })
  );
}
