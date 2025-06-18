import { GetEvent } from "../interfaces/event.js";
import { createErrorResponse, createSuccessResponse, formatResponseEvent } from "../utils/formatResponse.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { WisemblyApiError } from "./errors/index.js";
import { API_URL } from "../config.js";

/**
 * Fetches event data from the Wisembly API
 * @param params - Object containing the event keyword
 * @returns Promise resolving to CallToolResult with event data or error
 */
const getEvent = async ({ keyword }: GetEvent): Promise<CallToolResult> => {
  try {
    const url: string = `${API_URL}/api/6/event/${encodeURIComponent(keyword)}`;

    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error: string = await response.text().catch((): string => 'Unknown error');
      
      throw new WisemblyApiError(
        `Failed to fetch event "${keyword}"`,
        response.status,
        response.statusText,
        error
      );
    }

    let data: unknown;

    try {
      data = await response.json();
    } catch {
      throw new WisemblyApiError(
        `Invalid JSON response for event "${keyword}"`,
        response.status,
        response.statusText,
        'Response is not valid JSON'
      );
    }

    const formattedResponse: string = formatResponseEvent(data, keyword);
    
    return createSuccessResponse(formattedResponse);
  } catch (error: unknown) {
    console.error(`❌ Error in get_wisembly_event:`, error);
    
    if (error instanceof WisemblyApiError) {
      return createErrorResponse(
        `❌ Wisembly API Error for event "${keyword}":\n\nHTTP ${error.status}: ${error.statusText}\n\nMessage: ${error.message}\n\nResponse: ${error.response || 'No additional details'}`
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    return createErrorResponse(`❌ Network error fetching Wisembly event "${keyword}":\n\n${errorMessage}`);
  }
};

export { getEvent };