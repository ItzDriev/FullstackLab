import express from "express";
import {
  getMe,
  login,
  register,
  logout,
} from "../controllers/authController.ts";
import { authenticate, requireRole } from "../middleware/jwtMiddleware.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

export default router;
