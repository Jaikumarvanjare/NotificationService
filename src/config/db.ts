import mongoose from "mongoose";
import { DB_URL } from "./serviceConfig";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL as string);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};