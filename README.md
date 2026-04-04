# mcp-starter-typescript

> Starter template for building MCP servers in TypeScript. Clone, customize, ship.

**Problem:** Starting an MCP server from scratch requires boilerplate setup — transport, tool registration, TypeScript config, build pipeline. This template gives you a working MCP server in 5 minutes.

**Who is this for:** Developers building tools for the MCP (Model Context Protocol) ecosystem — custom integrations, documentation servers, automation tools.

## Quick Start

```bash
# 1. Clone
git clone https://github.com/Launchery/mcp-starter-typescript.git my-mcp-server
cd my-mcp-server

# 2. Install
npm install

# 3. Build
npm run build

# 4. Test
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | node dist/index.js
```

## What's Included

| File | Purpose |
|------|---------|
| `src/index.ts` | Server entry point (stdio transport) |
| `src/tools/echo.ts` | Example: echo tool |
| `src/tools/add.ts` | Example: arithmetic tool |
| `src/tools/search.ts` | Example: data search tool |
| `.mcp.json` | Local MCP client config for testing |
| `tsconfig.json` | Strict TypeScript config (ES2022, Node16) |

## Adding Your Own Tools

1. Create `src/tools/my-tool.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function myTool(server: McpServer): void {
  server.tool(
    "my-tool",
    "Description of what this tool does",
    {
      input: z.string().describe("Input parameter"),
    },
    async ({ input }) => ({
      content: [{ type: "text", text: `Result: ${input}` }],
    })
  );
}
```

2. Register in `src/tools/index.ts`:

```typescript
import { myTool } from "./my-tool.js";
// ...
myTool(server);
```

3. Build and test:

```bash
npm run build
npm start
```

## Connecting to MCP Clients

### Claude Desktop
```bash
claude mcp add --scope user my-server -- node "/path/to/dist/index.js"
```

### Cursor
Create `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
```

### Any MCP Client
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
```

## Development

```bash
# Watch mode
npm run dev

# Lint
npm run lint

# Format
npm run format
```

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features.

## License

MIT © Launchery
