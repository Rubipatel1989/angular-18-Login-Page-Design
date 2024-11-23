import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Using BehaviorSubject to hold the login state
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedIn.next(true); // Update the observable
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false); // Update the observable
  }
}
