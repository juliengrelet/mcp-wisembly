import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getEvent } from "./tools/getEvent.js";
import { getSessions } from "./tools/getSessions.js";

// create server MCP
const server = new McpServer({
  name: "wisembly-api-server",
  version: "1.0.0"
});

// define tools
getEvent(server);
getSessions(server);

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("🚀 Wisembly API MCP Server started successfully!");
    console.error("📡 Server name: wisembly-api-server");
    console.error("📦 Version: 1.0.0");
    console.error("--------------------------------");
    console.error("🛠️  Available Tools:");
    console.error("   • get_wisembly_event - Fetch any Wisembly event by ID");
    console.error("   • get_wisembly_event_authenticated - Fetch with optional API key");
    console.error("--------------------------------");
    console.error("✅ Ready for connections!");
    console.error("--------------------------------");
    console.error("API TOKEN: ", process.env.API_TOKEN || "No API token provided");
  } catch (error) {
    console.error("❌ Failed to start Wisembly MCP Server:", error);
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  console.error("\n🛑 Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error("\n🛑 Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

main().catch((error) => {
  console.error("💥 Unhandled error in main:", error);
  process.exit(1);
});