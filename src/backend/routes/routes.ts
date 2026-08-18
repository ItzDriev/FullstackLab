import { Router } from "express";
import authRouter from "./authRoutes.ts";

export const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.get("/api/health", (_req, res) => {
  res.json({ message: "API is running" });
});
