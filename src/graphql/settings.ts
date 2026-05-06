import { gql } from "graphql-tag";

export const GET_USER_SETTINGS = gql`
  query GetUserSettings {
    me {
      id
      name
      email
      phone
      avatar
      role
      notificationsEnabled
      orderNotifications
      deliveryNotifications
      systemAlerts
    }
  }
`;

export const UPDATE_USER_SETTINGS = gql`
  mutation UpdateUserSettings(
    $name: String
    $email: String
    $phone: String
    $avatar: String
    $notificationsEnabled: Boolean
    $orderNotifications: Boolean
    $deliveryNotifications: Boolean
    $systemAlerts: Boolean
  ) {
    updateUserSettings(
      name: $name
      email: $email
      phone: $phone
      avatar: $avatar
      notificationsEnabled: $notificationsEnabled
      orderNotifications: $orderNotifications
      deliveryNotifications: $deliveryNotifications
      systemAlerts: $systemAlerts
    ) {
      id
      name
      email
      phone
      avatar
      notificationsEnabled
      orderNotifications
      deliveryNotifications
      systemAlerts
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      success
      message
    }
  }
`;
