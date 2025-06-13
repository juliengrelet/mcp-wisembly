import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

/**
 * Formats event data into a readable string format
 * @param data - Raw event data from API
 * @param eventId - Event identifier for header
 * @returns Formatted string representation of the event
 */
const formatResponse = (data: unknown, eventId: string): string => {
    try {
      if (!data || typeof data !== 'object') {
        return `Error formatting event "${eventId}" data: Invalid data format\n\nRaw API Response:\n${JSON.stringify(data, null, 2)}`;
      }
  
      const eventData = data as Record<string, unknown>;
      const lines: string[] = [];
  
      lines.push(`Wisembly Event: ${eventId}`);
      lines.push('='.repeat(50));
      lines.push('');
  
      for (const [key, value] of Object.entries(eventData)) {
        if (value !== undefined && value !== null && value !== '') {
          const formattedValue = typeof value === 'object' 
            ? JSON.stringify(value) 
            : String(value);
          lines.push(`${key}: ${formattedValue}`);
        }
      }
  
      lines.push('');
      lines.push('-'.repeat(50));
      lines.push('Complete API Response:');
      lines.push('');
      lines.push(JSON.stringify(data, null, 2));
  
      return lines.join('\n');
  
    } catch (error) {
      console.error(`Error formatting event data:`, error);
      return `Error formatting event "${eventId}" data: ${error}\n\nRaw API Response:\n${JSON.stringify(data, null, 2)}`;
    }
};

/**
 * Creates a successful CallToolResult response
 * @param text - The response text content
 * @returns CallToolResult with success status
 */
const createSuccessResponse = (text: string): CallToolResult => ({
  content: [{
    type: "text" as const,
    text
  }],
  isError: false
} satisfies CallToolResult);

/**
 * Creates an error CallToolResult response
 * @param text - The error text content
 * @returns CallToolResult with error status
 */
const createErrorResponse = (text: string): CallToolResult => ({
  content: [{
    type: "text" as const,
    text
  }],
  isError: true
} satisfies CallToolResult);

export { formatResponse, createSuccessResponse, createErrorResponse }