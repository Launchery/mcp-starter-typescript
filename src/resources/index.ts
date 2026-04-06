import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Variables } from "@modelcontextprotocol/sdk/shared/uriTemplate.js";

/**
 * Static resource — returns a fixed value.
 * Use this pattern for config files, schemas, version info, etc.
 */
export function configResource(server: McpServer): void {
  server.resource(
    "config",
    "my-server://config",
    {
      description: "Server configuration and version info",
      mimeType: "application/json",
    },
    async () => ({
      contents: [
        {
          uri: "my-server://config",
          mimeType: "application/json",
          text: JSON.stringify(
            {
              name: "my-mcp-server",
              version: "1.1.0",
              description: "MCP Server built from mcp-starter-typescript",
            },
            null,
            2
          ),
        },
      ],
    })
  );
}

/**
 * Template resource — dynamic URI pattern.
 * Use this pattern when the resource depends on parameters from the URI.
 *
 * Example: my-server://items/42 → { id: 42, ... }
 */
export function itemResource(server: McpServer): void {
  server.resource(
    "item",
    new ResourceTemplate("my-server://items/{id}", {
      list: async () => ({
        resources: [
          { uri: "my-server://items/1", name: "Item 1" },
          { uri: "my-server://items/2", name: "Item 2" },
        ],
      }),
    }),
    {
      description: "Look up an item by ID",
    },
    async (uri: URL, variables: Variables) => {
      const id = variables.id as string;
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(
              {
                id: Number(id),
                name: `Item ${id}`,
                description: "Replace this with your actual data source.",
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}
