import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService
{
  constructor() { }

  public static isNullOrEmptyOrBlankOrUndefined(value: string): boolean
  {
    return !UtilityService.isNotNullOrEmptyOrBlankOrUndefined(value);
  }

  public static isNotNullOrEmptyOrBlankOrUndefined(value: string): boolean
  {
    return Boolean(value && value.trim() !== "");
  }

  public static getCurrentTimestamp(): string
  {
    return new Date().getTime().toString();
  }

  public static isNullOrUndefined(value: any): boolean
  {
    return value === undefined || value === null;
  }
}
