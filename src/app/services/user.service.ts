import { User } from './../model/User';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  login(user: User) {
    return this.apollo.query({
      query: gql`
        query ($username: String!, $password: String!) {
          login(username: $username, password: $password)
        }
      `,
      variables: {
        username: user.username,
        password: user.password,
      },
    });
  }

  signup(user: User) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($username: String!, $password: String!, $email: String!) {
          createAccount(
            email: $email
            username: $username
            password: $password
          ) {
            username
          }
        }
      `,
      variables: {
        username: user.username,
        password: user.password,
        email: user.email,
      },
    });
  }
}
