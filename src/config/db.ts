import mongoose from "mongoose";
import logger from "../utils/logger";
import { DB_URL } from "./serviceConfig";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL as string);

    logger.info("MongoDB connected");
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};