/**
 * This file regroup all the mutations relative to the authentication
 * */
import gql from 'graphql-tag';

/**
 * Mutation for login in the application
 * */
export const MUTATION_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      access_token
    }
  }
`;

/**
 * Mutation for signin in the application
 * */
export const MUTATION_SIGNING = gql`
  mutation Signing($username: String!, $password: String!) {
    signing(username: $username, password: $password) {
      username
      access_token
    }
  }
`;
