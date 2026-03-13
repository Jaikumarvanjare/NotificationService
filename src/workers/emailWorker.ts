import { Worker } from "bullmq";
import { sendEmail } from "../services/emailService";
import Notification from "../models/notificationModel";
import { connectDB } from "../config/db";

async function startWorker() {
  await connectDB();

  const worker = new Worker(
    "notificationQueue",
    async (job) => {
      const { email, subject, content, notificationId } = job.data;
      try {
        await sendEmail(email, subject, content);
        await Notification.findByIdAndUpdate(notificationId, {
          status: "SENT"
        });
        console.log("Email sent:", email);

      } catch (error) {
        await Notification.findByIdAndUpdate(notificationId, {
          status: "FAILED"
        });
        console.error("Email failed:", email);
        throw error;
      }
    },
    {
      connection: {
        host: "127.0.0.1",
        port: 6379
      }
    }
  );

  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed`, err);
  });
}
startWorker();