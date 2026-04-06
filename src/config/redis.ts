import Redis from "ioredis";
import { REDIS_URL } from "./serviceConfig";

const redis = new Redis(REDIS_URL as string);

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

export default redis;