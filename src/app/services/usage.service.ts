import { Injectable } from '@angular/core';

import { MessageService } from "./message.service";
import { Message } from "../models/message";
import { ConfigurationService } from "./configuration.service";
import { LogLevel, MessageMethod, MessageTransport } from "../models/types";
import { Constants } from "../models/constants";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: 'root'
})
export class UsageService
{
  constructor(private messageService: MessageService, private configurationService: ConfigurationService, private loggingService: LoggingService)
  {
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("UsageService", message, logLevel);
  }

  public usage(action: String): void
  {
    let url: string = this.configurationService.getConfigurationValue('system', 'users-service.url', 'http://localhost:20003/usage');
    url = `${url}?app=${Constants.APP_NAME}&user=${this.configurationService.getCurrentUser()}&action=${action}`;
    this.messageService.send(new Message(url, null, MessageTransport.HTTP, MessageMethod.POST)).subscribe(
      (result) =>
      {
        if(result)
          this.log(`result: ${result}`, LogLevel.DEBUG);
      },
      (error) =>
      {
        if(error)
          this.log(`${error.message}`, LogLevel.ERROR);
      });
  }
}
