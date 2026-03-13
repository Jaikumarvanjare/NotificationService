# Notification Service

A **Notification Microservice** responsible for sending emails asynchronously using a queue-based architecture.
This service integrates with the **Movie Booking Application** and sends booking confirmation emails after successful payments.

The system follows a **microservice architecture** and processes notifications using **BullMQ + Redis workers** to ensure reliable and scalable email delivery without blocking the main booking workflow.

---

# About the Movie Booking Application

The **Movie Booking Application** is a backend system that allows users to:

* Browse available movies
* View theatres and show timings
* Book movie tickets
* Make payments for bookings
* Manage booking history

When a user successfully completes a payment, the Movie Booking service sends a request to the **Notification Service**, which then sends a confirmation email to the user.

Repository:
https://github.com/Jaikumarvanjare/Movie_booking_application

---

# System Architecture

The booking system is split into **two services**:

1. **Movie Booking Service** – Handles bookings, payments, and theatre management.
2. **Notification Service** – Sends booking confirmation emails asynchronously.

```text
Movie Booking Service
        │
        ▼
Notification API (Express)
        │
        ▼
BullMQ Queue (Redis)
        │
        ▼
Worker Process
        │
        ▼
Nodemailer
        │
        ▼
Email Sent
```

This design ensures that **email delivery does not slow down the booking process**.

---

# Features

* Asynchronous email sending using **BullMQ**
* Queue-based background processing
* **Retry mechanism with exponential backoff**
* **Rate limiting** to prevent spam
* **Centralized logging** using Winston
* **MongoDB storage** for notification history
* **Queue monitoring dashboard** using Bull Board
* Health check endpoint
* Microservice integration with the Movie Booking system

---

# Tech Stack

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* Redis
* BullMQ
* Nodemailer
* Winston Logger
* Express Rate Limit

---

# Project Structure

```text
src
│
├── config
│   ├── apiConfig.ts
│   ├── db.ts
│   ├── queueDashboard.ts
│   └── serviceConfig.ts
│
├── controllers
│   └── notificationController.ts
│
├── middlewares
│   ├── errorHandler.ts
│   ├── notificationValidator.ts
│   └── rateLimiter.ts
│
├── models
│   └── notificationModel.ts
│
├── queues
│   └── notificationQueue.ts
│
├── routes
│   └── notificationRoutes.ts
│
├── services
│   └── emailService.ts
│
├── utils
│   └── logger.ts
│
└── workers
    └── emailWorker.ts
```

---

# Installation

Clone the repository:

```
git clone https://github.com/Jaikumarvanjare/NotificationService.git
```

Move into the project directory:

```
cd NotificationService
```

Install dependencies:

```
bun install
```

or

```
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```
PORT=3001
NODE_ENV=development

DB_URL=mongodb://localhost/noti_db
PROD_DB_URL=your_production_db_url

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

NOTI_SERVICE=http://localhost:3001
```

---

# Running the Service

Start the API server:

```
bun run index.ts
```

Start the worker process (in another terminal):

```
bun run src/workers/emailWorker.ts
```

---

# API Endpoints

### Health Check

```
GET /health
```

Response

```
{
  "status": "OK",
  "service": "notification-service"
}
```

---

### Send Notification

```
POST /notiservice/api/v1/notifications
```

Example request:

```
{
  "subject": "Movie Booking Confirmed",
  "recepientEmails": ["user@email.com"],
  "content": "Your booking has been confirmed"
}
```

---

# Queue Dashboard

BullMQ dashboard is available at:

```
http://localhost:3001/admin/queues
```

This allows monitoring:

* Waiting jobs
* Active jobs
* Completed jobs
* Failed jobs

---

# Example Integration with Movie Booking Service

After successful payment, the Movie Booking service calls the Notification API:

```javascript
await axios.post(
  "http://localhost:3001/notiservice/api/v1/notifications",
  {
    subject: "Movie Booking Confirmed",
    recepientEmails: [user.email],
    content: "Your booking is confirmed"
  }
);
```

---

# Notification Data Model

```
{
  to: String,
  subject: String,
  content: String,
  status: "PENDING" | "SENT" | "FAILED",
  createdAt: Date,
  updatedAt: Date
}
```

---

# Logging

The service uses **Winston logger** for structured logging.

Example log output:

```
[2026-03-13T18:20:31.201Z] INFO: Email sent
```

---

# Future Improvements

* Event-driven architecture using Kafka or RabbitMQ
* SMS and push notification support
* Email templates using HTML
* Notification retry dashboard
* Dead-letter queues for failed notifications

---

# Author

Jai Kumar Vanjare

GitHub
https://github.com/Jaikumarvanjare
