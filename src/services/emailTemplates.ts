type PasswordResetOtpData = {
  otp: string;
  expiresInMinutes?: number;
};

type BookingConfirmationData = {
  noOfSeats: number;
  bookingId?: string;
  movieName?: string;
  theatreName?: string;
  timing?: string;
};

type TheatreCreatedData = {
  theatreName?: string;
};

export const buildPasswordResetOtpEmail = (data: PasswordResetOtpData) => {
  const expiresInMinutes = data.expiresInMinutes || 10;

  return {
    subject: "CineBook password reset OTP",
    content: `Your CineBook password reset OTP is ${data.otp}. It will expire in ${expiresInMinutes} minutes.`
  };
};

export const buildBookingConfirmationEmail = (data: BookingConfirmationData) => {
  const details = [
    "Your booking has been confirmed.",
    `Seats booked: ${data.noOfSeats}.`,
    data.movieName ? `Movie: ${data.movieName}.` : "",
    data.theatreName ? `Theatre: ${data.theatreName}.` : "",
    data.timing ? `Show time: ${data.timing}.` : "",
    data.bookingId ? `Booking ID: ${data.bookingId}.` : ""
  ].filter(Boolean);

  return {
    subject: "Movie Booking Confirmed",
    content: details.join(" ")
  };
};

export const buildTheatreCreatedEmail = (data: TheatreCreatedData) => ({
  subject: "Successfully created a theatre",
  content: data.theatreName
    ? `You have successfully created the theatre ${data.theatreName}.`
    : "You have successfully created a new theatre."
});
