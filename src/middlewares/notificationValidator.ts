import { Request, Response, NextFunction } from "express";

export const validateNotificationRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { subject, recepientEmails, recipientEmails, content } = req.body;
  const emails = recipientEmails || recepientEmails;

  if (!subject) {
    return res.status(400).json({
      message: "Subject is required"
    });
  }

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({
      message: "Recipient emails must be a non-empty array"
    });
  }

  if (!content) {
    return res.status(400).json({
      message: "Content is required"
    });
  }

  next();
};

export const validatePasswordResetOtpRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, otp } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  next();
};

export const validateBookingConfirmationRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, noOfSeats } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!noOfSeats) {
    return res.status(400).json({ message: "Number of seats is required" });
  }

  next();
};

export const validateTheatreCreatedRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }

  next();
};
