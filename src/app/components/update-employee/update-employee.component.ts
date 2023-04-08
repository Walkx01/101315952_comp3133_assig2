import { Router } from '@angular/router';
import { Employee, Gender } from './../../model/Employee';
import { Component, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  genders = [Gender.Male, Gender.Female, Gender.Other];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>
  ) {}

  employee!: Employee;

  ngOnInit(): void {
    this.employee = Object.assign({}, this.data.employee);
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employee).subscribe(
      (result) => {
        this.dialogRef.close(); // Close the dialog
        this.snackBar.open('Employee updated successfully', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Error updating employee' + error.message, 'Close', {
          verticalPosition: 'top',
        });
      }
    );
  }
}
