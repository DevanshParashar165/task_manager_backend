import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "./db/index.js";
import userRoute from "./route/user.route.js";
import taskRoute from "./route/task.route.js";

dotenv.config();

const app = express();

/* Connect DB safely */
await connectDB();

/* Security */
app.use(helmet());
app.use(hpp());

/* Rate limit */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", limiter);

/* Logger */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* Parsers */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

/* CORS */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/* Routes */
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tasks", taskRoute);

/* Health check */
app.get("/", (req, res) => {
  res.json({ message: "Server working on Vercel" });
});

/* 404 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* Error handler */
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});


export default app; 
