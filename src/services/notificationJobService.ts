import Notification from "../models/notificationModel";
import { notificationQueue } from "../queues/notificationQueue";

type QueueEmailInput = {
  email: string;
  subject: string;
  content: string;
  delay?: number;
};

export const queueEmailNotification = async ({
  email,
  subject,
  content,
  delay = 0
}: QueueEmailInput) => {
  const notification = await Notification.create({
    to: email,
    subject,
    content,
    status: "PENDING"
  });

  await notificationQueue.add(
    "sendEmail",
    {
      email,
      subject,
      content,
      notificationId: notification._id
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000
      },
      delay
    }
  );

  return {
    email,
    status: "QUEUED"
  };
};
