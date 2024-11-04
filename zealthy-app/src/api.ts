import { UserData } from "./types";
const API_URL = process.env.API_URL || "http://localhost:3001";

export const api = {
  // Configuration endpoints
  async getConfig() {
    const response = await fetch(`${API_URL}/api/admin/config`);
    if (!response.ok) throw new Error("Failed to fetch configuration");
    return response.json();
  },

  async updateConfig(config: {
    page2Components: string[];
    page3Components: string[];
  }) {
    const response = await fetch(`${API_URL}/api/admin/config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(config)
    });
    if (!response.ok) throw new Error("Failed to update configuration");
    return response.json();
  },

  // User endpoints
  async createUser(userData: Partial<UserData>) {
    const response = await fetch(`${API_URL}/api/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
  },

  async updateUser(email: string, userData: Partial<UserData>) {
    const response = await fetch(`${API_URL}/api/users/email/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
  },

  async getUser(email: string) {
    const response = await fetch(`${API_URL}/api/users/email/${email}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  },

  async getUsers() {
    const response = await fetch(`${API_URL}/api/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  }
};
