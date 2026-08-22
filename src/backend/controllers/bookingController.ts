import type { AuthRequest } from "../middleware/jwtMiddleware";
import type { Response } from "express";
import { Types } from "mongoose";
import { Booking } from "../models/Booking.ts";
import { Service } from "../models/Service.ts";

const VALID_STATUSES = ["pending", "confirmed", "cancelled", "completed"];

export async function createBooking(req: AuthRequest, res: Response) {
  try {
    const { serviceSlug, requestedTime, notes } = req.body;

    //Check the service and the requested time exist
    if (!serviceSlug || !requestedTime) {
      res.status(400).json({
        success: false,
        error: "serviceSlug and requestedTime are required",
      });
      return;
    }

    //The slug comes from the url, so confirm it maps to a real service
    const service = await Service.findOne({ slug: serviceSlug, active: true });
    if (!service) {
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }

    //Check that the time is a valid future time
    const time = new Date(requestedTime);
    if (isNaN(time.getTime()) || time.getTime() < Date.now()) {
      res.status(400).json({
        success: false,
        error: "requestedTime must be a valid future date",
      });
      return;
    }

    const booking = await Booking.create({
      userId: req.user!.userId,
      serviceId: service._id,
      requestedTime: time,
      notes,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create booking" });
  }
}

//Relational: joins bookings to the services collection
export async function getMyBookings(req: AuthRequest, res: Response) {
  try {
    const bookings = await Booking.find({ userId: req.user!.userId }).populate(
      "serviceId",
      "name slug durationMinutes priceSek",
    );
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
}

//Relational: joins bookings to both the users and the services collections
export async function getAllBookings(_req: AuthRequest, res: Response) {
  try {
    const bookings = await Booking.find()
      .populate("userId", "username fullName")
      .populate("serviceId", "name slug durationMinutes priceSek");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
}

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
    )
      .populate("userId", "username fullName")
      .populate("serviceId", "name slug durationMinutes priceSek");

    if (!booking) {
      res.status(404).json({ success: false, error: "Booking not found" });
      return;
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update booking" });
  }
}

export async function deleteBooking(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      res.status(404).json({ success: false, error: "Booking not found" });
      return;
    }

    //A user may delete their own booking, an admin may delete any of them
    const isOwner = booking.userId.toString() === req.user!.userId;
    if (!isOwner && req.user!.role !== "admin") {
      res.status(403).json({ success: false, error: "Forbidden" });
      return;
    }

    await booking.deleteOne();
    res.status(200).json({ success: true, data: { _id: id } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to delete booking" });
  }
}

/*
  Custom aggregation endpoint: booking statistics for the logged in user.
  Returns totals, a per-status breakdown and a per-service breakdown.
*/
export async function getBookingStats(req: AuthRequest, res: Response) {
  try {
    /*
      aggregate() does not cast strings to ObjectId the way find() does,
      so the id from the JWT has to be converted manually or $match
      silently returns nothing.
    */
    const userId = new Types.ObjectId(req.user!.userId);

    const result = await Booking.aggregate([
      { $match: { userId } },
      {
        /*
          $facet runs several pipelines over the same matched documents,
          so one round trip to the database returns every breakdown.
        */
        $facet: {
          total: [{ $count: "count" }],
          byStatus: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
          byService: [
            { $group: { _id: "$serviceId", count: { $sum: 1 } } },
            //$lookup is the aggregation pipeline's version of populate()
            {
              $lookup: {
                from: "services",
                localField: "_id",
                foreignField: "_id",
                as: "service",
              },
            },
            { $unwind: "$service" },
            { $project: { _id: 0, serviceType: "$service.name", count: 1 } },
            { $sort: { count: -1 } },
          ],
        },
      },
    ]);

    const facets = result[0];

    /*
      $group only returns statuses that actually occur, so the missing ones
      are filled in with 0 and the frontend always gets the same shape.
    */
    const byStatus: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      cancelled: 0,
      completed: 0,
    };
    for (const row of facets.byStatus) {
      byStatus[row._id] = row.count;
    }

    res.status(200).json({
      success: true,
      data: {
        total: facets.total[0]?.count ?? 0,
        byStatus,
        byService: facets.byService,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch booking stats" });
  }
}
