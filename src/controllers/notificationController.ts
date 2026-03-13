import { Request, Response } from "express";
import Notification from "../models/notificationModel";
import { notificationQueue } from "../queues/notificationQueue";
import logger from "../utils/logger";

export const createNotification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const { subject, recepientEmails, content, delay } = req.body;

    const results = [];

    for (const email of recepientEmails) {

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
          delay: delay || 0
        }
      );

      results.push({
        email,
        status: "QUEUED"
      });
    }

    return res.status(200).json({
      message: "Notifications queued successfully",
      data: results
    });

  } catch (error) {

    logger.error(`Notification processing failed: ${error}`);

    return res.status(500).json({
      message: "Notification processing failed"
    });
  }
};