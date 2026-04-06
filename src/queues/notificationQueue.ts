import { Queue } from "bullmq";
import { REDIS_URL } from "../config/serviceConfig";

export const notificationQueue = new Queue("notificationQueue", {
  connection: {
    url: REDIS_URL as string
  }
});