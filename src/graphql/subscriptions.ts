import gql from "graphql-tag";

export const ON_PRODUCT_CREATED = gql`
  subscription OnProductCreated {
    products(order_by: {created_at: desc}, limit: 1) {
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

export const ON_TRACKING_UPDATED = gql`
  subscription OnTrackingUpdated {
    tracking(order_by: {updated_at: desc}) {
      id
      tracking_id
      status
      updated_at
    }
  }
`;

export const ON_ORDER_UPDATED = gql`
  subscription OnOrderUpdated {
    orders(order_by: {updated_at: desc}) {
      id
      order_id
      status
      updated_at
    }
  }
`;
