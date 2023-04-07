import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Employee, Gender } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  createEmployee(employee: Employee) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($employee: EmployeeInput!) {
          createEmployee(employee: $employee) {
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
        employee: {
          firstname: employee.firstname,
          lastname: employee.lastname,
          email: employee.email,
          gender: employee.gender,
          salary: employee.salary,
        },
      },
    });
  }
  getAllEmployees() {
    return this.apollo.query({
      query: gql`
        query {
          getEmployees {
            firstname
            lastname
            email
            gender
            salary
          }
        }
      `,
    });
  }
}
