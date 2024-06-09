import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  currentUser: {username: string; token: string; roles: string[]} | null = null;

  login(body: {username: string, password: string}) {
    // Mock authentication: any username and password will work
    this.currentUser = {
      username: body.username,
      token: 'mock-token',
      roles: body.username === 'admin' ? ['admin', 'user'] : ['user']
    };
    console.log(this.currentUser);
    
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  
}
