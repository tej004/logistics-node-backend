import { Router } from "express";
import authRoutes from "../app/auth/routes/auth.routes";
import riderRoutes from "@/app/user/routes/rider.routes";

const router = Router();

router.use("/auth", authRoutes)
router.use("/rider", riderRoutes)

export default router;