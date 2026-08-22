import { Router } from "express";
import authRouter from "./authRoutes.ts";
import userRouter from "./userRoutes.ts";

export const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/users", userRouter);
mainRouter.get("/api/health", (_req, res) => {
  res.json({ message: "API is running" });
});
