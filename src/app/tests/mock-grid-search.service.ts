import { BehaviorSubject } from "rxjs";

export class GridSearchServiceMock
{
  public gridSearchTextSubject = new BehaviorSubject<string>("");

  public setText(searchText: string): void
  {
  }
}
