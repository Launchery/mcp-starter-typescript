import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Search tool — searches a local data array.
 * Example of a tool that queries structured data.
 *
 * Replace the sample data with your own dataset.
 */

const SAMPLE_DATA = [
  { id: 1, title: "Getting Started with MCP", category: "tutorial" },
  { id: 2, title: "Building Custom Tools", category: "guide" },
  { id: 3, title: "MCP Protocol Reference", category: "reference" },
  { id: 4, title: "Debugging MCP Servers", category: "guide" },
  { id: 5, title: "Deploying to Production", category: "tutorial" },
];

export function searchTool(server: McpServer): void {
  server.tool(
    "search",
    "Search sample data by query string. Returns matching entries.",
    {
      query: z.string().describe("Search query"),
    },
    async ({ query }) => {
      const lower = query.toLowerCase();
      const results = SAMPLE_DATA.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          item.category.toLowerCase().includes(lower)
      );

      if (results.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No results found for "${query}"`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: results
              .map((r) => `[${r.category}] #${r.id}: ${r.title}`)
              .join("\n"),
          },
        ],
      };
    }
  );
}
