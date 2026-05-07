import type { AuthProvider } from "@refinedev/core";
import { TOKEN_KEY } from "./constants";
import { GraphQLClient } from "graphql-request";
import { LOGIN_MUTATION, REGISTER_MUTATION, GET_ME_QUERY } from "../graphql/auth";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    try {
      // Demo mode - allow demo credentials to work
      if ((username === 'demo@flup.com' || email === 'demo@flup.com') && password === 'password123') {
        const demoUser = {
          id: 'demo-user',
          name: 'Demo User',
          email: 'demo@flup.com',
          role: 'admin',
          avatar: null,
        };
        localStorage.setItem(TOKEN_KEY, 'demo-token');
        localStorage.setItem("user", JSON.stringify(demoUser));
        return { success: true, redirectTo: "/dashboard" };
      }

      const client = new GraphQLClient(API_URL, {
        headers: { "x-hasura-role": "public" },
      });

      const data: any = await client.request(LOGIN_MUTATION, { username: username || email, password });

      if (data?.login?.access_token) {
        localStorage.setItem(TOKEN_KEY, data.login.access_token);
        localStorage.setItem("refresh_token", data.login.refresh_token);
        localStorage.setItem("user", JSON.stringify(data.login.user));
        return { success: true, redirectTo: "/dashboard" };
      }

      return {
        success: false,
        error: { name: "LoginError", message: "Invalid username or password" },
      };
    } catch (error: any) {
      return {
        success: false,
        error: { name: "LoginError", message: error.message || "Login failed" },
      };
    }
  },

  register: async ({ name, fullName, email, password, phone }) => {
    try {
      const client = new GraphQLClient(API_URL, {
        headers: { "x-hasura-role": "public" },
      });

      const data: any = await client.request(REGISTER_MUTATION, {
        name: name || fullName,
        email,
        password,
        phone
      });

      if (data?.register?.access_token) {
        localStorage.setItem(TOKEN_KEY, data.register.access_token);
        localStorage.setItem("refresh_token", data.register.refresh_token);
        localStorage.setItem("user", JSON.stringify(data.register.user));
        return { success: true, redirectTo: "/dashboard" };
      }

      return {
        success: false,
        error: { name: "RegisterError", message: "Registration failed" },
      };
    } catch (error: any) {
      return {
        success: false,
        error: { name: "RegisterError", message: error.message || "Registration failed" },
      };
    }
  },

  forgotPassword: async ({ email }) => {
    try {
      // For demo purposes, just show success message
      if (email === 'demo@flup.com') {
        return { success: true, message: "Reset link sent to your email" };
      }

      // In a real app, you would call your forgot password API here
      // const client = new GraphQLClient(API_URL, {
      //   headers: { "x-hasura-role": "public" },
      // });
      // await client.request(FORGOT_PASSWORD_MUTATION, { email });

      return { success: true, message: "Reset link sent to your email" };
    } catch (error: any) {
      return {
        success: false,
        error: { name: "ForgotPasswordError", message: error.message || "Failed to send reset link" },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    return { success: true, redirectTo: "/auth" };
  },

  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return { authenticated: true };
    }
    return { authenticated: false, redirectTo: "/auth" };
  },

  getPermissions: async () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)?.role : null;
  },

  getIdentity: async () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
