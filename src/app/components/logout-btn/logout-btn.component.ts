import { Component } from '@angular/core';

@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.css'],
})
export class LogoutBtnComponent {
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  }
}
