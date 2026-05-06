import gql from "graphql-tag";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($object: products_insert_input!) {
    insert_products_one(object: $object) {
      id
      display_name
      item_id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: uuid!, $set: products_set_input!) {
    update_products_by_pk(pk_columns: {id: $id}, _set: $set) {
      id
      display_name
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

export const CREATE_TRACKING = gql`
  mutation CreateTracking($object: tracking_insert_input!) {
    insert_tracking_one(object: $object) {
      id
      tracking_id
    }
  }
`;

export const UPDATE_TRACKING = gql`
  mutation UpdateTracking($id: uuid!, $set: tracking_set_input!) {
    update_tracking_by_pk(pk_columns: {id: $id}, _set: $set) {
      id
      tracking_id
      status
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($object: orders_insert_input!) {
    insert_orders_one(object: $object) {
      id
      order_id
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: uuid!, $set: orders_set_input!) {
    update_orders_by_pk(pk_columns: {id: $id}, _set: $set) {
      id
      order_id
    }
  }
`;
