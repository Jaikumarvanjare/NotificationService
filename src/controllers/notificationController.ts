import { Request, Response } from "express";
import {
  buildBookingConfirmationEmail,
  buildPasswordResetOtpEmail,
  buildTheatreCreatedEmail
} from "../services/emailTemplates";
import { queueEmailNotification } from "../services/notificationJobService";
import logger from "../utils/logger";

export const createNotification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const { subject, recepientEmails, recipientEmails, content, delay } = req.body;
    const emails = recipientEmails || recepientEmails;

    const results = [];

    for (const email of emails) {
      results.push(await queueEmailNotification({
        email,
        subject,
        content,
        delay
      }));
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

export const sendPasswordResetOtp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, otp, expiresInMinutes } = req.body;
    const message = buildPasswordResetOtpEmail({ otp, expiresInMinutes });
    const data = await queueEmailNotification({ email, ...message });

    return res.status(200).json({
      message: "Password reset OTP queued successfully",
      data
    });
  } catch (error) {
    logger.error(`Password reset OTP notification failed: ${error}`);

    return res.status(500).json({
      message: "Password reset OTP notification failed"
    });
  }
};

export const sendBookingConfirmation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, noOfSeats, bookingId, movieName, theatreName, timing } = req.body;
    const message = buildBookingConfirmationEmail({
      noOfSeats,
      bookingId,
      movieName,
      theatreName,
      timing
    });
    const data = await queueEmailNotification({ email, ...message });

    return res.status(200).json({
      message: "Booking confirmation queued successfully",
      data
    });
  } catch (error) {
    logger.error(`Booking confirmation notification failed: ${error}`);

    return res.status(500).json({
      message: "Booking confirmation notification failed"
    });
  }
};

export const sendTheatreCreated = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, theatreName } = req.body;
    const message = buildTheatreCreatedEmail({ theatreName });
    const data = await queueEmailNotification({ email, ...message });

    return res.status(200).json({
      message: "Theatre creation notification queued successfully",
      data
    });
  } catch (error) {
    logger.error(`Theatre creation notification failed: ${error}`);

    return res.status(500).json({
      message: "Theatre creation notification failed"
    });
  }
};
