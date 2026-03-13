import { Request, Response } from "express";
import Notification from "../models/notificationModel";
import { notificationQueue } from "../queues/notificationQueue";

export const createNotification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const { subject, recepientEmails, content } = req.body;

    if (!subject) {
      return res.status(400).json({
        message: "Subject is required"
      });
    }

    if (!recepientEmails || recepientEmails.length === 0) {
      return res.status(400).json({
        message: "Recipient email required"
      });
    }

    if (!content) {
      return res.status(400).json({
        message: "Content is required"
      });
    }

    const results = [];

    for (const email of recepientEmails) {

      // save notification in DB
      const notification = await Notification.create({
        to: email,
        subject,
        content,
        status: "PENDING"
      });

      // push job to BullMQ queue
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
          }
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

    console.error("Notification processing failed:", error);

    return res.status(500).json({
      message: "Notification processing failed"
    });

  }
};