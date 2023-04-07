import { Component } from '@angular/core';
import { Employee, Gender } from './../../model/Employee';
import { EmployeeService } from './../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  employees: Employee[] = [];

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'gender',
    'salary',
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((result: any) => {
      this.employees = result.data.getEmployees;
    });
  }
}
