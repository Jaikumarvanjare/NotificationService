import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "SENT", "FAILED"],
      default: "PENDING"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Notification", notificationSchema);