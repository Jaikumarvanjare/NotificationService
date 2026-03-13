import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../config/serviceConfig";

export const sendEmail = async (
  to: string,
  subject: string,
  content: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: to,
      subject: subject,
      text: content
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return info;

  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};