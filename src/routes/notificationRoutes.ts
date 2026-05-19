import express from "express";
import {
  createNotification,
  sendBookingConfirmation,
  sendPasswordResetOtp,
  sendTheatreCreated
} from "../controllers/notificationController";
import {
  validateBookingConfirmationRequest,
  validateNotificationRequest,
  validatePasswordResetOtpRequest,
  validateTheatreCreatedRequest
} from "../middlewares/notificationValidator";
import { notificationRateLimiter } from "../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/notifications",
  notificationRateLimiter,
  validateNotificationRequest,
  createNotification
);

router.post(
  "/emails/password-reset-otp",
  notificationRateLimiter,
  validatePasswordResetOtpRequest,
  sendPasswordResetOtp
);

router.post(
  "/emails/booking-confirmation",
  notificationRateLimiter,
  validateBookingConfirmationRequest,
  sendBookingConfirmation
);

router.post(
  "/emails/theatre-created",
  notificationRateLimiter,
  validateTheatreCreatedRequest,
  sendTheatreCreated
);

export default router;
