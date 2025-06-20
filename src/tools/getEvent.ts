import { z } from "zod";
import { getEvent as getEventApi } from "../api/getEvent.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createTool } from "../utils/createTool.js";
import { GetEvent } from "../interfaces/event.js";

const getEventSchema = z.object({
  keyword: z.string().describe("The keyword to search for in the Wisembly API")
});

const getEvent = (server: McpServer): void => {
  createTool(
    server,
    "get_wisembly_event",
    "Fetch event data from the Wisembly API for any keyword",
    getEventSchema,
    async ({ keyword }: GetEvent) => await getEventApi({ keyword })
  );
};

export { getEvent }