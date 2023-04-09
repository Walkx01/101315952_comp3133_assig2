import { AuthguardService } from './services/authguard.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username: string | null = null;

  constructor(private authService: AuthguardService, private router: Router) {
    this.authService.isLoggedIn.subscribe((user) => {
      this.username = user;
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in authguard.service.ts
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/employees']);
    }
  }
  title = '101315952_comp3133_assig2';
}
