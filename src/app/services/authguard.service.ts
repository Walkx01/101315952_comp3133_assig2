import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(private router: Router) {}

  // store username in local storage
  private loggedInUser = new BehaviorSubject<string | null>(
    localStorage.getItem('username')
  );

  // get username from local storage
  get isLoggedIn() {
    return this.loggedInUser.asObservable();
  }

  // set username in local storage
  login(username: string) {
    localStorage.setItem('username', username);
    this.loggedInUser.next(username);
  }

  // remove username from local storage
  logout() {
    localStorage.removeItem('username');
    this.loggedInUser.next(null);
  }

  // allow access to route if user is logged in
  canActivate(): boolean {
    const username = localStorage.getItem('username');
    if (username) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
