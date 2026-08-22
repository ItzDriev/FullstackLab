import type { AuthRequest } from "../middleware/jwtMiddleware";
import type { Request, Response } from "express";
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
export async function getMyBookings(req: AuthRequest, res: Response) {}
export async function updateBookingStatus(req: AuthRequest, res: Response) {}
export async function getAllBookings(req: AuthRequest, res: Response) {}
