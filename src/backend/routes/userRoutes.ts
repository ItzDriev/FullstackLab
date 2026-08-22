import express from "express";
import { getProfile } from "../controllers/userController.ts";

const router = express.Router();
router.get("/:username", getProfile);

export default router;
