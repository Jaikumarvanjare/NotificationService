import { Request, Response, NextFunction } from "express";

export const validateNotificationRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { subject, recepientEmails, content } = req.body;

  if (!subject) {
    return res.status(400).json({
      message: "Subject is required"
    });
  }

  if (!recepientEmails || recepientEmails.length === 0) {
    return res.status(400).json({
      message: "Recipient emails are required"
    });
  }

  if (!content) {
    return res.status(400).json({
      message: "Content is required"
    });
  }

  next();
};