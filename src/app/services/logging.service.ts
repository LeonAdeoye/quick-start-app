import { Injectable } from '@angular/core';
import { LogLevel } from "../models/types";
import { Constants } from "../models/constants";
import * as log4JavaScript from 'log4javascript';

@Injectable({
  providedIn: 'root'
})
export class LoggingService
{
  private loggerMaxSize: number = Constants.MAX_LOG_SIZE;
  private loggerDefaultLevel: LogLevel = LogLevel.DEBUG;
  private loggerURL: string = "http://localhost:20002/log";
  private logger: any;
  private loggerUserId: string = "";

  constructor()
  {

  }

  public initialize(loggerApp: string, loggerUserId: string, loggerMaxSize: number, loggerDefaultLogLevel: LogLevel)
  {
    this.loggerMaxSize = loggerMaxSize;
    this.loggerUserId = loggerUserId;
    this.loggerDefaultLevel = loggerDefaultLogLevel;
    this.logger = log4JavaScript.getLogger(loggerApp);
    let appender = new log4JavaScript.AjaxAppender(this.loggerURL);
    appender.addHeader('Content-Type', 'application/x-www-form-urlencoded');
    this.logger.addAppender(appender);
  }

  public log(source: string, message: string, logLevel?: LogLevel)
  {
    if(!logLevel)
      logLevel = LogLevel.DEBUG;

    if(logLevel < this.loggerDefaultLevel)
      return;

    const messageToLog = `[${this.loggerUserId}@${source}]=>${this.truncate(message)}`;
    console.log(messageToLog);

    switch(logLevel)
    {
      case LogLevel.DEBUG:
        this.logger.debug(messageToLog);
        break;
      case LogLevel.ERROR:
        this.logger.error(messageToLog);
        break;
      case LogLevel.INFO:
        this.logger.info(messageToLog);
        break;
      case LogLevel.TRACE:
        this.logger.trace(messageToLog);
        break;
      case LogLevel.WARN:
        this.logger.warn(messageToLog);
        break;
    }
  }

  private truncate(value: string): string
  {
    return (value.length > this.loggerMaxSize) ? (value.slice(0, this.loggerMaxSize) + "...[TRUNCATED]") : value;
  }

  public setLogMaxSize(maxLogSize: number): void
  {
    this.loggerMaxSize = maxLogSize;
  }

  public setLogLevel(logLevel: LogLevel)
  {
    this.loggerDefaultLevel = logLevel;
  }
}
