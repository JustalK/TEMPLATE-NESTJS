import gql from 'graphql-tag';

export const MUTATION_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      access_token
    }
  }
`;

export const MUTATION_SIGNING = gql`
  mutation Signing($username: String!, $password: String!) {
    signing(username: $username, password: $password) {
      username
      access_token
    }
  }
`;
