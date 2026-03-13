import express from "express";
import { createNotification } from "../controllers/notificationController";

const router = express.Router();

router.post("/notiservice/api/v1/notifications", createNotification);

export default router;