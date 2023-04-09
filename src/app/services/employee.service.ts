import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';
import { Employee, Gender } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}



  updateEmployee(employee: Employee) {
    return this.apollo.mutate({
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
    });
  }

  createEmployee(employee: Employee) {
    return this.apollo.mutate({
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
}
