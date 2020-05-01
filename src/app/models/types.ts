export enum LogLevel
{
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5
}

export enum MessageMethod
{
  WEB_SOCKET = "WEB_SOCKET",
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}

export enum MessageTransport
{
  HTTP = "Http",
  HTTPS = "Https",
  WEB_SOCKET = "WebSocket"
}


export enum ServiceUpdate
{
  UP,
  REFRESH,
  UPDATE,
  STALE,
  DISCONNECTED
}
