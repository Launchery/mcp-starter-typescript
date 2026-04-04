#!/usr/bin/env node

/**
 * MCP Server Starter Template
 *
 * This is the entry point for your MCP server.
 * It sets up a stdio transport and registers your tools.
 *
 * To customize:
 * 1. Edit src/tools/ to add/modify tools
 * 2. Edit this file to change server name and description
 * 3. Run `npm run build` to compile
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerTools } from "./tools/index.js";

const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// Register all tools
registerTools(server);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
