import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { connectDB } from "./src/config/db";
import { API_PREFIX } from "./src/config/apiConfig";
import { serverAdapter } from "./src/config/queueDashboard";
import { PORT } from "./src/config/serviceConfig";

import notificationRoutes from "./src/routes/notificationRoutes";
import { errorHandler } from "./src/middlewares/errorHandler";
import logger from "./src/utils/logger";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use(API_PREFIX, notificationRoutes);

app.use("/admin/queues", serverAdapter.getRouter());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    service: "notification-service"
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Notification Service Running");
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Notification server started on port ${PORT}`);

  console.log("\n=================================");
  console.log("Notification Service started successfully");
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`Queue Dashboard: http://localhost:${PORT}/admin/queues`);
  console.log("=================================\n");

  console.log("Notification Service Commands:");
  console.log("---------------------------------");
  console.log("redis-server      -> Start Redis message queue");
  console.log("npm run dev       -> Start notification API server");
  console.log("npm run worker    -> Start email queue worker");
  console.log("npm run worker:dev -> Start email worker with ts-node\n");

  console.log("Movie Booking Backend:");
  console.log("---------------------------------");
  console.log("Set NOTI_SERVICE=http://localhost:3001 in Movie_booking_application/.env");
  console.log("Then restart the Movie Booking backend server.\n");
});
