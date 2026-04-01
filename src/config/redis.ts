import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("ready", () => {
  console.log("🚀 Redis ready");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

redis.on("close", () => {
  console.warn("⚠️ Redis connection closed");
});

export default redis;