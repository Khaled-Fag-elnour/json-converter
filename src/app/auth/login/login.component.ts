import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Both fields are required';
      return
    }
    
    if (this.authService.login(form.form.value)) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Login failed';
    }
  }
}
