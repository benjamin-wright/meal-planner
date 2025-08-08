import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const server = new McpServer({
  name: "MCP Test Server",
  version: "1.0.0",
})

server.tool(
  "e2e-test",
  "Run the playwright end to end tests",
  {},
  async ({}) => {
    return {
      content: [{ type: "text", text: "Hello World!" }],
    }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)