import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ user });
    } catch (err: any) {
      res.status(409).json({ message: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ user, token, token_type: "Bearer" });
  }
}