import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db";
import notificationRoutes from "./src/routes/notificationRoutes";
import { API_PREFIX } from "./src/config/apiConfig";
import { serverAdapter } from "./src/config/queueDashboard";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use(API_PREFIX, notificationRoutes);
app.use("/admin/queues", serverAdapter.getRouter());

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Notification server started");
});