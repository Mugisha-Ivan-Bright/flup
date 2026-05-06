import { gql } from "graphql-tag";

export const GET_PRODUCTS = gql`
  query GetProducts($where: products_bool_exp, $limit: Int, $offset: Int) {
    products(where: $where, limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      display_name
      item_id
      price
      material
      dimensions
      category
      thumbnail_url
      created_at
    }
    products_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: uuid!) {
    delete_products_by_pk(id: $id) {
      id
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($object: products_insert_input!) {
    insert_products_one(object: $object) {
      id
      display_name
      item_id
      price
      material
      dimensions
      category
      thumbnail_url
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: uuid!, $object: products_set_input!) {
    update_products_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      display_name
      item_id
      price
      material
      dimensions
      category
      thumbnail_url
    }
  }
`;
