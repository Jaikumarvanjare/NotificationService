import { Request, Response } from "express";
import Notification from "../models/notificationModel";
import { sendEmail } from "../services/emailService";

export const createNotification = async (req: Request, res: Response) => {
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

      try {

        await sendEmail(email, subject, content);

        notification.status = "SENT";
        await notification.save();

        results.push({
          email,
          status: "SENT"
        });

      } catch (error) {

        notification.status = "FAILED";
        await notification.save();

        results.push({
          email,
          status: "FAILED"
        });

      }
    }

    return res.status(200).json({
      message: "Notifications processed",
      data: results
    });

  } catch (error) {

    return res.status(500).json({
      message: "Notification processing failed",
      error
    });

  }
};