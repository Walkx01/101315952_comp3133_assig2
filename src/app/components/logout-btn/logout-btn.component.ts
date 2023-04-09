import { Component } from '@angular/core';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.css'],
})
export class LogoutBtnComponent {
  constructor(private authService: AuthguardService) {}
  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('username');
  //   window.location.reload();
  // }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
