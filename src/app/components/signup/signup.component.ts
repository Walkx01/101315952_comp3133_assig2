import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/User';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private UserService: UserService,
    private snackBar: MatSnackBar
  ) {}

  user: User = {
    username: '',
    password: '',
    email: '',
  };

  onSubmit() {
    this.UserService.signup(this.user).subscribe(
      (result) => {
        this.snackBar.open(
          'Account successfully created, please login',
          'Close',
          {
            duration: 2000,
            verticalPosition: 'top',
          }
        );
      },
      (error) => {
        if (error.message.includes('duplicate key error')) {
          this.snackBar.open(
            'Error creating account: username or email already exists',
            'Close',
            {
              verticalPosition: 'top',
            }
          );
        } else {
          this.snackBar.open(
            'Error creating account: ' + error.message,
            'Close',
            {
              verticalPosition: 'top',
            }
          );
        }
      }
    );
  }
}
