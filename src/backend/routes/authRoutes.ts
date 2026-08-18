import express from "express";
import { register } from "../controllers/authController.ts";

const router = express.Router();

router.post("/register", register);
//router.post("/login");
//router.post("/logout");

export default router;
