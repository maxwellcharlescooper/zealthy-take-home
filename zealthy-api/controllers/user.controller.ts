import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const data = await UserModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const existingUser = await UserModel.findByEmail(email);

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const data = await UserModel.update(email, req.body);
      res.json(data);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await UserModel.findAll();
      res.json(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  static async getByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const data = await UserModel.findByEmail(email);

      if (!data) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }
}
