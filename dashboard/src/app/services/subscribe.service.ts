import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  public eventId: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setEventId(eventid: any): void {
    this.eventId.next(eventid);
  }
}
