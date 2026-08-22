import { Schema, model, Types } from "mongoose";

interface BookingProps {
  userId: Types.ObjectId;
  serviceType: "Vod Review" | "Hands-On Session" | "Macro & UI Assistance";
  requestedTime: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
}

const bookingSchema = new Schema<BookingProps>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceType: {
      type: String,
      enum: ["VOD Review", "Hands-On Session", "Macro & UI Assistance"],
      required: true,
    },
    requestedTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true },
);

export const Booking = model<BookingProps>("Booking", bookingSchema);
export type { BookingProps };
