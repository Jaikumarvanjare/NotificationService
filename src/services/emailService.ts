import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../config/serverConfig";

export const sendEmail = async (
  to: string,
  subject: string,
  content: string
) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text: content
  };

  return transporter.sendMail(mailOptions);
};