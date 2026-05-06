import { gql } from "graphql-tag";

export const GET_ORDERS = gql`
  query GetOrders($where: orders_bool_exp, $limit: Int, $offset: Int) {
    orders(where: $where, limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      order_id
      customer_name
      status
      total
      created_at
    }
    orders_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: uuid!) {
    orders_by_pk(id: $id) {
      id
      order_id
      customer_name
      status
      total
      created_at
      items
      shipping_address
      notes
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: uuid!, $object: orders_set_input!) {
    update_orders_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      order_id
      customer_name
      status
      total
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: uuid!) {
    delete_orders_by_pk(id: $id) {
      id
    }
  }
`;
