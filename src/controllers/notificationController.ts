import { Request, Response } from "express";
import Notification from "../models/notificationModel";
import { notificationQueue } from "../queues/notificationQueue";

export const createNotification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const { subject, recepientEmails, content } = req.body;

    if (!recepientEmails || recepientEmails.length === 0) {
      return res.status(400).json({
        message: "Recipient email required"
      });
    }

    const results = [];

    for (const email of recepientEmails) {

      const notification = await Notification.create({
        to: email,
        subject,
        content,
        status: "PENDING"
      });

      // push job to queue
      await notificationQueue.add("sendEmail", {
        email,
        subject,
        content,
        notificationId: notification._id
      });

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

    return res.status(500).json({
      message: "Notification processing failed",
      error
    });

  }
};