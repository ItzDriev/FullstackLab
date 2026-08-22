import express from "express";
import { authenticate, requireRole } from "../middleware/jwtMiddleware.ts";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.ts";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/me", authenticate, getMyBookings);
router.patch("/:id", authenticate, requireRole("admin"), updateBookingStatus);
router.get("/all", authenticate, requireRole("admin"), getAllBookings);

export default router;
