import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { User } from 'src/app/model/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userservice: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  user: User = {
    email: '',
    username: '',
    password: '',
  };

  onSubmit() {
    this.userservice.login(this.user).subscribe(
      () => {
        // login user using localStorage
        localStorage.setItem('username', this.user.username);
        this.router.navigate(['/employees']);
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Error logging in' + error.message, 'Close', {
          verticalPosition: 'top',
        });
      }
    );
  }
}
