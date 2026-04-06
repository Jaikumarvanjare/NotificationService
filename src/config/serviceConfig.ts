import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const DB_URL = isProduction
  ? process.env.PROD_DB_URL
  : process.env.LOCAL_DB_URL;

export const REDIS_URL = isProduction
  ? process.env.PROD_REDIS_URL
  : process.env.LOCAL_REDIS_URL;

export const PORT = process.env.PORT || 3000;

export const EMAIL_USER = process.env.EMAIL_USER as string;
export const EMAIL_PASS = process.env.EMAIL_PASS as string;