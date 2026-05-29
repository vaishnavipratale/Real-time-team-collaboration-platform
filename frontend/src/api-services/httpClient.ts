export class HttpError extends Error {
  status: number;
  body: unknown;
  serverMessage: string;

  constructor(status: number, body: unknown, serverMessage = "") {
    super(serverMessage || `HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
    this.serverMessage = serverMessage;
  }
}

export class NetworkError extends Error {
  constructor(message = "Network error") {
    super(message);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends Error {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "TimeoutError";
  }
}
