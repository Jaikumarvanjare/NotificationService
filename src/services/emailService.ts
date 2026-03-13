import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  content: string
) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: content
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");

    return info;

  } catch (error) {

    console.error("Email sending failed", error);
    throw error;

  }
};