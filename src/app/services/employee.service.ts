import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Employee, Gender } from '../model/Employee';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeesSubject = new BehaviorSubject<Employee[]>([]);

  newEmployeeSubject = new Subject<Employee>();
  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    this.apollo
      .query({
        query: gql`
          query {
            getEmployees {
              id
              firstname
              lastname
              email
              gender
              salary
            }
          }
        `,
      })
      .subscribe((result: any) => {
        const employees = result.data.getEmployees;
        this.employeesSubject.next(employees);
      });

    return this.employeesSubject.asObservable();
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation (
            $firstname: String!
            $lastname: String!
            $email: String!
            $gender: String!
            $salary: Float!
          ) {
            addEmployee(
              firstname: $firstname
              lastname: $lastname
              email: $email
              gender: $gender
              salary: $salary
            ) {
              id
              firstname
              lastname
              email
              gender
              salary
            }
          }
        `,
        variables: {
          firstname: employee.firstname,
          lastname: employee.lastname,
          email: employee.email,
          gender: employee.gender.toString(),
          salary: employee.salary,
        },
      })
      .pipe(
        tap((result: any) => {
          const newEmployee = result.data.addEmployee;
          this.newEmployeeSubject.next(newEmployee);
        })
      );
  }

  updateEmployee(employee: Employee) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation (
            $id: String!
            $firstname: String!
            $lastname: String!
            $email: String!
            $gender: String!
            $salary: Float!
          ) {
            updateEmployee(
              id: $id
              firstname: $firstname
              lastname: $lastname
              email: $email
              gender: $gender
              salary: $salary
            ) {
              id
              firstname
              lastname
              email
              gender
              salary
            }
          }
        `,
        variables: {
          id: employee.id,
          firstname: employee.firstname,
          lastname: employee.lastname,
          email: employee.email,
          gender: employee.gender.toString(),
          salary: employee.salary,
        },
      })
      .pipe(
        map((result: any) => result.data.updateEmployee),
        tap((updatedEmployee: Employee) => {
          const employees = this.employeesSubject.getValue();
          const index = employees.findIndex(
            (emp) => emp.id === updatedEmployee.id
          );
          const updatedEmployees = [
            ...employees.slice(0, index),
            updatedEmployee,
            ...employees.slice(index + 1),
          ];
          this.employeesSubject.next(updatedEmployees);
        })
      );
  }

  getEmployeeById(id: number) {
    return this.apollo.query({
      query: gql`
        query ($id: Int!) {
          getEmployeeByID(id: $id) {
            id
            firtsname
            lastname
            email
            gender 
            salary
  }`,
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: String!) {
          deleteEmployee(id: $id) {
            id
          }
        }
      `,
      variables: {
        id: id,
      },
    });
  }
}
