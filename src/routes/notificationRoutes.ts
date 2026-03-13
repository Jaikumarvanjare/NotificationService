import express from "express";
import { createNotification } from "../controllers/notificationController";
import { validateNotificationRequest } from "../middlewares/notificationValidator";

const router = express.Router();

router.post(
  "/notifications",
  validateNotificationRequest,
  createNotification
);

export default router;