import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ZodObject, ZodRawShape } from "zod";

const createTool = (
  server: McpServer,
  toolName: string,
  toolDescription: string,
  toolSchema: ZodObject<ZodRawShape>,
  toolFunction: (args: any) => Promise<any>
) => {
  server.tool(toolName, toolDescription, toolSchema.shape, toolFunction);
};

export { createTool };