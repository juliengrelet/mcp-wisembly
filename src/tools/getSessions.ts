import { z } from "zod";
import { getSessions as getSessionsApi } from "../api/getSessions.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createTool } from "../utils/createTool.js";
import { GetEvent } from "../interfaces/event.js";

const getEventSchema = z.object({
  keyword: z.string().describe("The keyword to search for in the Wisembly API")
});

const getSessions = (server: McpServer): void => {
  createTool(
    server,
    "get_wisembly_sessions",
    "Fetch sessions data from the Wisembly API by event id",
    getEventSchema,
    async ({ keyword }: GetEvent) => await getSessionsApi({ keyword })
  );
};

export { getSessions }