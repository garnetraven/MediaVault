import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(username: string) {
    localStorage.setItem('currentUser', username);
    this.currentUserSubject.next(username);
  }

  clearCurrentUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
