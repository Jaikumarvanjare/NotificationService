import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./src/config/db";
import { API_PREFIX } from "./src/config/apiConfig";
import { serverAdapter } from "./src/config/queueDashboard";
import { PORT } from "./src/config/serviceConfig";

import notificationRoutes from "./src/routes/notificationRoutes";
import { errorHandler } from "./src/middlewares/errorHandler";
import logger from "./src/utils/logger";
import "./src/config/redis";
import "./src/workers/emailWorker";  

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use(API_PREFIX, notificationRoutes);

app.use("/admin/queues", serverAdapter.getRouter());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "notification-service"
  });
});

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Notification server started on port ${PORT}`);
});