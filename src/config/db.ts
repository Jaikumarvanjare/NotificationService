
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbUrl =
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DB_URL
        : process.env.DB_URL;

    await mongoose.connect(dbUrl as string);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};