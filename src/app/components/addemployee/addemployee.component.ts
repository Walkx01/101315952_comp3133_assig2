import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee, Gender } from '../../model/Employee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
})
export class AddemployeeComponent {
  selectedGender!: Gender;
  genders = [Gender.Male, Gender.Female, Gender.Other];

  employee: Employee = {
    firstname: '',
    lastname: '',
    email: '',
    gender: Gender.Other,
    salary: 0,
  };

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    this.employeeService.createEmployee(this.employee).subscribe(
      (result) => {
        this.snackBar.open('Employee created successfully', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
        });
        // Redirect to the employeelist
        this.router.navigate(['/employees']);
        
      },
      (error) => {
        if (error.message.includes('E11000 duplicate key error')) {
          this.snackBar.open(
            'this email already exists in our system',
            'Close',
            {
              verticalPosition: 'top',
            }
          );
        } else {
          this.snackBar.open(
            'Error creating employee' + error.message,
            'Close',
            { verticalPosition: 'top' }
          );
        }
      }
    );
  }
}
