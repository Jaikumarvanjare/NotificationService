import express from "express";
import { createNotification } from "../controllers/notificationController";
import { validateNotificationRequest } from "../middlewares/notificationValidator";
import { notificationRateLimiter } from "../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/notifications",
  notificationRateLimiter,
  validateNotificationRequest,
  createNotification
);

export default router;