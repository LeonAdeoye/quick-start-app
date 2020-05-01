import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GridSearchService
{
  public gridSearchTextSubject = new BehaviorSubject<string>("");

  constructor()
  {
  }

  public setText(searchText: string): void
  {
    this.gridSearchTextSubject.next(searchText);
  }
}
