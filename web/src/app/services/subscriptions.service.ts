import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  public userData: BehaviorSubject<string> = new BehaviorSubject(null);
  public userName: BehaviorSubject<string> = new BehaviorSubject(null);
  public profilePic: BehaviorSubject<string> = new BehaviorSubject(null);
  public lastLogin: BehaviorSubject<string> = new BehaviorSubject(null);
  public eventId: BehaviorSubject<string> = new BehaviorSubject(null);
  public city: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }

  setUserData(role: string): void {
    this.userData.next(role);
  }

  setEventId(role: string): void {
    this.eventId.next(role);
  }

  setUserName(role: string): void {
    this.userName.next(role);
  }

  setUserDP(role: string): void {
    this.profilePic.next(role);
  }

  setUserLogin(role: string): void {
    this.lastLogin.next(role);
  }

  setLocation(role: string): void{
    this.city.next(role);
  }
}
