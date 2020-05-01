import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'localDateTimestamp'})
export class LocalDateTimestamp implements PipeTransform
{
  transform(epochTimeInUTC: number): string
  {
    return new Date(epochTimeInUTC).toLocaleString();
  }
}
