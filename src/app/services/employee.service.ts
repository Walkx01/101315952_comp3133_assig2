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
          addEmployee(employee: $employee) {
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
            id
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
  

  updateEmployee(employee: Employee) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($employee: EmployeeInput!) {
          updateEmployee(employee: $employee) {
            id
            firstname
            lastname
            email
            gender
            salary
          }`,
    });
  }
}

