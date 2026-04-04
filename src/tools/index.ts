import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { echoTool } from "./echo.js";
import { addTool } from "./add.js";
import { searchTool } from "./search.js";

/**
 * Register all MCP tools here.
 * Add your own tools by creating new files in this directory
 * and importing + calling them here.
 */
export function registerTools(server: McpServer): void {
  echoTool(server);
  addTool(server);
  searchTool(server);

  // Add your tools here:
  // myCustomTool(server);
}
