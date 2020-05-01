import { Message } from "../models/message";
import { Subject } from "rxjs";

export class MessageServiceMock
{
  public subjectMock = new Subject();

  public send(message: Message) : any
  {
    return this.subjectMock;
  }
}
