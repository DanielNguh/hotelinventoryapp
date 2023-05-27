import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor() { }

  login(email: string, password: string) {
    if(email === "nguhdaniel@gmail.com" && password === "admin123"){
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if (email === 'user@gmail.com' && password === 'user') {
      this.isAdmin = false;
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }

}
