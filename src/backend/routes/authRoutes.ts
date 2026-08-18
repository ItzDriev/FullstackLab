import express from "express";
import { getMe, login, register } from "../controllers/authController.ts";
import { authenticate } from "../middleware/jwtMiddleware.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
//router.post("/logout");
router.get("/me", authenticate, getMe);

export default router;
