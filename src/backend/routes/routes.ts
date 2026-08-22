import { Router } from "express";
import authRouter from "./authRoutes.ts";
import userRouter from "./userRoutes.ts";
import bookingRouter from "./bookingRoutes.ts";
import serviceRouter from "./serviceRoutes.ts";

export const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/users", userRouter);
mainRouter.get("/api/health", (_req, res) => {
  res.json({ message: "API is running" });
});
mainRouter.use("/api/booking", bookingRouter);
mainRouter.use("/api/services", serviceRouter);
