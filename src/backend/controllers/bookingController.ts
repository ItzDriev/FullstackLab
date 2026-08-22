import type { AuthRequest } from "../middleware/jwtMiddleware";
import type { Response } from "express";
import { Booking } from "../models/Booking.ts";

export async function createBooking(req: AuthRequest, res: Response) {
  try {
    const { serviceType, requestedTime, notes } = req.body;
    //Check servicetype and requested time are exist
    if (!serviceType || !requestedTime) {
      res.status(400).json({
        success: false,
        error: "serviceType and requestedTime are required",
      });
      return;
    }
    //Check that the time is a valid time
    const time = new Date(requestedTime);
    if (isNaN(time.getTime()) || time.getTime() < Date.now()) {
      res.status(400).json({
        success: false,
        error: "requestedTime must be a valid future date",
      });
      return;
    }
    //create the shit
    const booking = await Booking.create({
      userId: req.user!.userId,
      serviceType,
      requestedTime: time,
      notes,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create booking" });
  }
}
export async function getMyBookings(req: AuthRequest, res: Response) {
  try {
    const bookings = await Booking.find({ userId: req.user!.userId });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch bookings" });
  }
}

export async function getAllBookings(_req: AuthRequest, res: Response) {
  try {
    const bookings = await Booking.find().populate(
      "userId",
      "username fullName",
    );
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch bookings" });
  }
}

const VALID_STATUSES = ["pending", "confirmed", "cancelled", "completed"];

export async function updateBookingStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      res.status(400).json({ success: false, error: "Invalid status value" });
      return;
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!booking) {
      res.status(404).json({ success: false, error: "Booking not found" });
      return;
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update booking" });
  }
}
