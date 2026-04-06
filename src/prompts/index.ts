import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Simple prompt — no arguments.
 * Use this for canned prompts that the client can send to the LLM.
 */
export function helloPrompt(server: McpServer): void {
  server.prompt(
    "hello",
    "A simple greeting prompt to test the connection.",
    async () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Hello! I am connected to the MCP server. What can you help me with?",
          },
        },
      ],
    })
  );
}

/**
 * Parameterized prompt — accepts arguments.
 * Use this pattern when the prompt needs dynamic input from the user.
 */
export function debugPrompt(server: McpServer): void {
  server.prompt(
    "debug-error",
    "Generate a debugging prompt for a specific error message.",
    {
      errorMessage: z.string().describe("The error message to debug"),
      language: z
        .string()
        .optional()
        .describe("Programming language context (optional)"),
    },
    async ({ errorMessage, language }) => {
      const langContext = language ? ` in ${language}` : "";
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `I'm getting the following error${langContext}:\n\n${errorMessage}\n\nPlease help me debug this. Show me the likely cause and how to fix it.`,
            },
          },
        ],
      };
    }
  );
}
