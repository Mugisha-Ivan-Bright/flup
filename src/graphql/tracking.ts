import { gql } from "graphql-tag";

export const GET_TRACKING = gql`
  query GetTracking($where: tracking_bool_exp, $limit: Int, $offset: Int) {
    tracking(where: $where, limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      tracking_id
      status
      origin_city
      destination_city
      time_left
      distance_km
      estimated_time
      stops
      created_at
    }
    tracking_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const CREATE_TRACKING = gql`
  mutation CreateTracking($object: tracking_insert_input!) {
    insert_tracking_one(object: $object) {
      id
      tracking_id
      status
      origin_city
      destination_city
    }
  }
`;

export const UPDATE_TRACKING = gql`
  mutation UpdateTracking($id: uuid!, $object: tracking_set_input!) {
    update_tracking_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      tracking_id
      status
      origin_city
      destination_city
    }
  }
`;

export const DELETE_TRACKING = gql`
  mutation DeleteTracking($id: uuid!) {
    delete_tracking_by_pk(id: $id) {
      id
    }
  }
`;
