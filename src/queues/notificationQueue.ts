import { Queue } from "bullmq";

export const notificationQueue = new Queue("notificationQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
});