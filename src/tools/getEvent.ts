import { GetEvent } from "../interfaces/event.js";
import { formatResponse } from "../utils/formatResponse.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { WisemblyApiError } from "../errors/index.js";

const getEvent = async ({ keyword }: GetEvent): Promise<CallToolResult> => {
  try {
    const url = `https://api-prp.wisembly.com/api/6/event/${keyword}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text().catch((): string => 'Unknown error');
      
      throw new WisemblyApiError(
        `Failed to fetch event "${keyword}"`,
        response.status,
        response.statusText,
        errorText
      );
    }

    let data: unknown;

    try {
      data = await response.json();
    } catch (jsonError) {
      throw new WisemblyApiError(
        `Invalid JSON response for event "${keyword}"`,
        response.status,
        response.statusText,
        'Response is not valid JSON'
      );
    }

    const formattedResponse = formatResponse(data, keyword);
    
    return {
      content: [{
        type: "text" as const,
        text: formattedResponse
      }],
      isError: false
    };

  } catch (error: unknown) {
    console.error(`❌ Error in get_wisembly_event:`, error);
    if (error instanceof WisemblyApiError) {
      return {
        content: [{
          type: "text" as const,
          text: `❌ Wisembly API Error for event "${keyword}":\n\nHTTP ${error.status}: ${error.statusText}\n\nMessage: ${error.message}\n\nResponse: ${error.response || 'No additional details'}`
        }],
        isError: true
      };
    }
    
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      content: [{
        type: "text" as const,
        text: `❌ Network error fetching Wisembly event "${keyword}":\n\n${errorMessage}`
      }],
      isError: true
    };
  }
};

export { getEvent };