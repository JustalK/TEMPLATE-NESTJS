import gql from 'graphql-tag';

export const MUTATION_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      access_token
    }
  }
`;
