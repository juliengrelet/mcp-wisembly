export class WisemblyApiError extends Error {
    constructor(
      message: string,
      public status: number,
      public statusText: string,
      public response?: string
    ) {
      super(message);
      this.name = 'WisemblyApiError';
      
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, WisemblyApiError);
      }
    }
  }
  
  export class WisemblyNotFoundError extends WisemblyApiError {
    constructor(keyword: string, response?: string) {
      super(`Event "${keyword}" not found`, 404, 'Not Found', response);
      this.name = 'WisemblyNotFoundError';
    }
  }
  
  export class WisemblyUnauthorizedError extends WisemblyApiError {
    constructor(response?: string) {
      super('Unauthorized access to Wisembly API', 401, 'Unauthorized', response);
      this.name = 'WisemblyUnauthorizedError';
    }
  }
  
  export class WisemblyServerError extends WisemblyApiError {
    constructor(status: number, statusText: string, response?: string) {
      super('Wisembly API server error', status, statusText, response);
      this.name = 'WisemblyServerError';
    }
  }