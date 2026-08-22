import { Schema, model, Types } from "mongoose";

interface BookingProps {
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
  requestedTime: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
}

const bookingSchema = new Schema<BookingProps>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    //References the services collection instead of repeating its name here,
    //so a renamed service can never drift out of sync with its bookings
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    requestedTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    notes: { type: String, maxlength: 1000 },
  },
  { timestamps: true },
);

export const Booking = model<BookingProps>("Booking", bookingSchema);
export type { BookingProps };
