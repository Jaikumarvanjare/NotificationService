import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Notification server running on port ${PORT}`);
});