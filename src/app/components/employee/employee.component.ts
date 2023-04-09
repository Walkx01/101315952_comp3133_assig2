import { UpdateEmployeeComponent } from './../update-employee/update-employee.component';
import { EmployeeDetailComponent } from './../employee-detail/employee-detail.component';
import { Component, EventEmitter, Output } from '@angular/core';
import { Employee, Gender } from './../../model/Employee';
import { EmployeeService } from './../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  employees: Employee[] = [];

  displayedColumns: string[] = [
    'No',
    'firstname',
    'lastname',
    'email',
    'action',
  ];

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.employeeService.employeesSubject.subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
    this.employeeService.getAllEmployees();
    this.employeeService.newEmployeeSubject.subscribe(
      (newEmployee: Employee) => {
        this.employees.push(newEmployee);
      }
    );
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe((result: any) => {
      this.employees = this.employees.filter((employee) => employee.id !== id);
    });
  }

  onRowClick(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDetailComponent, {
      data: { employee: employee },
    });
  }

  updateEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: { employee: employee },
    });
  }
}
