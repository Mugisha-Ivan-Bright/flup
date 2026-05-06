import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  query Products($where: products_bool_exp, $offset: Int, $limit: Int, $order_by: [products_order_by!]) {
    products(where: $where, offset: $offset, limit: $limit, order_by: $order_by) {
      id
      display_name
      item_id
      price
      material
      dimensions
      category
      thumbnail_url
    }
    products_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_TRACKING = gql`
  query Tracking($where: tracking_bool_exp, $offset: Int, $limit: Int) {
    tracking(where: $where, offset: $offset, limit: $limit, order_by: {created_at: desc}) {
      id
      tracking_id
      status
      origin_city
      destination_city
      distance_km
      estimated_time
      time_left
      stops
    }
  }
`;

export const GET_ORDERS = gql`
  query Orders($where: orders_bool_exp, $offset: Int, $limit: Int) {
    orders(where: $where, offset: $offset, limit: $limit, order_by: {created_at: desc}) {
      id
      order_id
      customer_name
      status
      total
      created_at
    }
  }
`;

export const GET_ORDER = gql`
  query Order($id: uuid!) {
    orders_by_pk(id: $id) {
      id
      order_id
      customer_name
      customer_email
      customer_phone
      status
      total
      departure_date
      delivery_date
      shipping_address
      driver_name
      driver_id
      route
      items
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query Customers($where: customers_bool_exp, $offset: Int, $limit: Int) {
    customers(where: $where, offset: $offset, limit: $limit) {
      id
      name
      email
      phone
      orders_count
    }
  }
`;

export const GET_DISCOUNTS = gql`
  query Discounts($where: discounts_bool_exp, $offset: Int, $limit: Int) {
    discounts(where: $where, offset: $offset, limit: $limit) {
      id
      code
      type
      value
      expires_at
      status
    }
  }
`;

export const GET_LEDGER = gql`
  query Ledger($where: ledger_bool_exp, $offset: Int, $limit: Int) {
    ledger(where: $where, offset: $offset, limit: $limit, order_by: {date: desc}) {
      id
      date
      description
      amount
      type
      balance
    }
  }
`;

export const GET_TAXES = gql`
  query Taxes($where: taxes_bool_exp, $offset: Int, $limit: Int) {
    taxes(where: $where, offset: $offset, limit: $limit) {
      id
      name
      rate
      region
      status
    }
  }
`;
