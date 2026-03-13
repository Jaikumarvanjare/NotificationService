import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;

export const DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_URL
    : process.env.DB_URL;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;