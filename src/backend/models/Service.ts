import { Schema, model } from "mongoose";

interface ServiceProps {
  name: string;
  slug: string;
  description: string;
  deliverables: string[];
  priceSek: number;
  durationMinutes: number;
  active: boolean;
  displayOrder: number;
}

const serviceSchema = new Schema<ServiceProps>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    //Used in the /booking/:serviceType url so it has to stay url safe
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-z0-9-]+$/,
    },
    description: { type: String, required: true, minlength: 20 },
    deliverables: { type: [String], default: [] },
    priceSek: { type: Number, required: true, min: 0, max: 100000 },
    //A VOD review and a live raid session are not the same length
    durationMinutes: { type: Number, required: true, min: 15, max: 480 },
    //Lets a service stop being offered without deleting its booking history
    active: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Service = model<ServiceProps>("Service", serviceSchema);
export type { ServiceProps };
