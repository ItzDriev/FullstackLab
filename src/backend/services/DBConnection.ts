import mongoose from "mongoose";
import { mongoUri, dbOptions } from "../config/dbOptions.ts";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(mongoUri, dbOptions);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
}
