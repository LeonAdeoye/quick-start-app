import { Injectable } from '@angular/core';
import { LogLevel, MessageTransport } from "../models/types";
import { LoggingService } from "./logging.service";
import { Message } from "../models/message";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService
{
  constructor(private loggingService: LoggingService, private httpClient: HttpClient)
  {
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("MessageService", message, logLevel);
  }

  public send(message: Message) : any
  {
    switch(message.getTransport())
    {
      case MessageTransport.HTTP:
        let messageOptions: any =
        {
          headers: new HttpHeaders(
  {
            'Content-Type':  'application/json'
          })
        };
        if(message.getPayload())
          messageOptions.body = message.getPayload();
        this.log(`Sending ${message.getMethod()} message to back-end micro-service at ${message.getAddress()} with payload: ${JSON.stringify(messageOptions)}`, LogLevel.INFO);
        return this.httpClient.request<any>(message.getMethod(), message.getAddress(), messageOptions);
      case MessageTransport.HTTPS:
        break;
      case MessageTransport.WEB_SOCKET:
        break;
    }

    return "";
  }
}
