import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'json-converter';

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.authService.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    }
  }
}
