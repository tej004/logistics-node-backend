import { Router } from "express";
import { RiderController } from "../controllers/rider.controller";
import { authJwtMiddleware } from "@/app/auth/middlewares/auth.jwt.middleware";

const router = Router();

router.get("/profile", authJwtMiddleware, RiderController.getProfile)
router.post("/register", authJwtMiddleware, RiderController.register)

export default router;