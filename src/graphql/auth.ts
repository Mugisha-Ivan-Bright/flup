import { gql } from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
      refresh_token
      user {
        id
        name
        email
        role
        avatar
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!, $phone: String) {
    register(name: $name, email: $email, password: $password, phone: $phone) {
      access_token
      refresh_token
      user {
        id
        name
        email
        role
        avatar
      }
    }
  }
`;

export const GET_ME_QUERY = gql`
  query GetMe {
    me {
      id
      name
      email
      role
      avatar
    }
  }
`;
