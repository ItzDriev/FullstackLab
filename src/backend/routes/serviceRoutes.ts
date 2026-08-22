import express from "express";
import {
  getServices,
  getServiceBySlug,
  createService,
  deleteService,
} from "../controllers/serviceController.ts";
import { authenticate, requireRole } from "../middleware/jwtMiddleware.ts";

const router = express.Router();

router.get("/", getServices);
router.post("/", authenticate, requireRole("admin"), createService);
router.get("/:slug", getServiceBySlug);
router.delete("/:id", authenticate, requireRole("admin"), deleteService);

export default router;
