import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(this.email === "nguhdaniel@gmail.com" && this.password === "admin123"){
      alert("Login Successful!");
      this.route.navigate(['/rooms','add']);
    }
  }

}
