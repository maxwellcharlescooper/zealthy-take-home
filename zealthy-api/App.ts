// src/server.ts
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigins
  })
);
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Types
export interface UserData {
  email: string;
  password?: string;
  about?: string;
  address?: Partial<{
    street: string;
    city: string;
    state: string;
    zip: string;
  }>;
  birthdate?: string;
  onboarding_step?: number;
}

export interface Config {
  page2Components: ComponentType[];
  page3Components: ComponentType[];
}

export type ComponentType = "about" | "address" | "birthdate";

// Default configuration
const defaultConfig: Config = {
  page2Components: ["about", "birthdate"],
  page3Components: ["address"]
};

// Configuration endpoints
// get config
app.get("/api/admin/config", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("onboarding_configs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return res.json(defaultConfig);
    }

    res.json({
      page2Components: data.page2_components,
      page3Components: data.page3_components
    });
  } catch (error) {
    console.error("Error fetching config:", error);
    res.status(500).json({ error: "Failed to fetch configuration" });
  }
});

// post config
app.post("/api/admin/config", async (req, res) => {
  try {
    const config = req.body as Config;

    // validation
    if (!config.page2Components.length || !config.page3Components.length) {
      return res.status(400).json({
        error: "Each page must have at least one component"
      });
    }

    const { error } = await supabase.from("onboarding_configs").insert([
      {
        page2_components: config.page2Components,
        page3_components: config.page3Components
      }
    ]);

    if (error) throw error;

    res.json(config);
  } catch (error) {
    console.error("Error saving config:", error);
    res.status(500).json({ error: "Failed to save configuration" });
  }
});

// User endpoints
// create user
app.post("/api/createUser", async (req, res) => {
  try {
    const userData = req.body as UserData;

    // Save additional user data
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          ...userData
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// update user by email
app.patch("/api/users/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body as Partial<UserData>;

    // check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError || !existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // update user
    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("email", email)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// get all users
app.get("/api/users", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// get user by email
app.get("/api/users/email/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
