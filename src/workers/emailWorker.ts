import { Worker } from "bullmq";
import { sendEmail } from "../services/emailService";

new Worker(
  "notificationQueue",
  async (job) => {

    const { email, subject, content } = job.data;

    await sendEmail(email, subject, content);

    console.log("Email sent to:", email);

  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
);