import { z } from "zod";
import { getEvent as getEventApi } from "../api/getEvent.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const getEvent = (server: McpServer): void => {
    server.tool(
        "get_wisembly_event",
        "Fetch event data from the Wisembly API for any keyword",
        {
          keyword: z.string().describe("The keyword to search for in the Wisembly API")
        },
        async ({ keyword }) => await getEventApi({ keyword })
    );
}

export { getEvent }