import { Schema, model } from "mongoose";
interface UserProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const userSchema = new Schema<UserProps>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^(?:[a-zA-Z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&'+/=?^_`{|}~-]+)|"(?:(?:\[\x00-\x7F]|[^\"]))")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z]{2,}|(?:[(?:\d{1,3}.){3}\d{1,3}]))$/,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

export const User = model<UserProps>("User", userSchema);
export type { UserProps };
