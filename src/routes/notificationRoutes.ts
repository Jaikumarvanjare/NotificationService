import express from "express";
import { createNotification } from "../controllers/notificationController";
import { validateNotificationRequest } from "../middlewares/notificationValidator";

const router = express.Router();

router.post(
  "/notiservice/api/v1/notifications",
  validateNotificationRequest,
  createNotification
);

export default router;