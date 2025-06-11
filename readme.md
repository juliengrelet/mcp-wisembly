# MCP Server Wisembly
### First step
This MCP Server is designed to interact with the Wisembly API. It provides a set of tools to fetch event data from the Wisembly API.

#### Setup

1. Clone the repository
2. Install the dependencies using 
```bash
npm install
```
3. Build the project 
```bash
npm run build
```

#### Tools

- `get_wisembly_event`: Fetch event data from the Wisembly API for any keyword (on PRP only for the moment)

#### Environment Variables

- `API_TOKEN`: Your Wisembly API token. This is required for several futurs endpoints (POST, GET, DELETE, etc…).

#### Error Handling

The server defines several custom error classes to handle different types of errors:

- `WisemblyApiError`: Base error class for all Wisembly API errors
- `WisemblyNotFoundError`: Thrown when an event is not found
- `WisemblyUnauthorizedError`: Thrown when unauthorized access to the Wisembly API is detected
- `WisemblyServerError`: Thrown when a server error occurs in the Wisembly API

#### Response Formatting

The server uses a custom response formatter to format the data returned from the Wisembly API. The formatter includes fields such as event ID, name, description, status, start date, end date, location, organizer, participants, and URL.

#### Configuration

```json
{
    "mcpServers": {
        "mcpWisembly": {
            "command": "/usr/local/bin/node",
            "args": ["/{your-path}/build/index.js"],
            "env": {
                "API_TOKEN": "your_api_token"
            }
        }
    }
}
```

