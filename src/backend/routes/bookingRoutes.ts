import express from "express";
import { authenticate, requireRole } from "../middleware/jwtMiddleware.ts";
import {
  createBooking,
  getAllBookings,
  getBookingStats,
  getMyBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.ts";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/me", authenticate, getMyBookings);
router.get("/stats", authenticate, getBookingStats);
router.patch("/:id", authenticate, requireRole("admin"), updateBookingStatus);
router.get("/all", authenticate, requireRole("admin"), getAllBookings);
//Ownership is checked inside the controller so a user can remove their own
router.delete("/:id", authenticate, deleteBooking);

export default router;
