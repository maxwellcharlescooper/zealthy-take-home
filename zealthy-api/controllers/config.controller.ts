import { Request, Response } from "express";
import { ConfigModel } from "../models/config.model";

export class ConfigController {
  static async get(req: Request, res: Response) {
    try {
      const config = await ConfigModel.getLatest();
      res.json(config);
    } catch (error) {
      console.error("Error fetching config:", error);
      res.status(500).json({ error: "Failed to fetch configuration" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const config = req.body;

      if (!config.page2Components.length || !config.page3Components.length) {
        return res.status(400).json({
          error: "Each page must have at least one component"
        });
      }

      const result = await ConfigModel.create(config);
      res.json(result);
    } catch (error) {
      console.error("Error saving config:", error);
      res.status(500).json({ error: "Failed to save configuration" });
    }
  }
}
