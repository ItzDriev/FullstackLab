import { Router } from "express";
import authRouter from "./authRoutes.ts";

export const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
