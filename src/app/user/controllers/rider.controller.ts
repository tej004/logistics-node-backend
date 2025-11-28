import { Request, Response } from "express";
import { RiderService } from "../services/rider.service";

export class RiderController {
  static async getProfile(req: Request, res: Response) {
    try {
      const rider = await RiderService.getProfile((req as any).user.uuid);
      if (!rider) return res.status(404).json({ message: "Rider not found" });
      res.json({ rider });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const rider = await RiderService.register(req.body, (req as any).user.uuid);
      res.status(201).json({ rider });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}