import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import gigRoute from "./routes/gigRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import orderRoute from "./routes/orderRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import messageRoute from "./routes/messageRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const API_SERVER = express();
dotenv.config();

API_SERVER.use(express.json());

API_SERVER.use(cookieParser());

API_SERVER.use(
  cors({
    origin: ["http://localhost:5173", "https://final1-client.netlify.app"],

    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

API_SERVER.use("/api/auth", authRoute);
API_SERVER.use("/api/users", userRoute);
API_SERVER.use("/api/gigs", gigRoute);
API_SERVER.use("/api/reviews", reviewRoute);
API_SERVER.use("/api/orders", orderRoute);
API_SERVER.use("/api/conversations", conversationRoute);
API_SERVER.use("/api/messages", messageRoute);

API_SERVER.use((err, req, res, next) => {
  const errorStatus = err.status || 500;

  const errorMessage = err.status || "something went wrong";

  return res.status(errorStatus).send(errorMessage);
});
const PORT = process.env.PORT || 3000;
API_SERVER.listen(PORT, () => {
  console.log("server running");
  connect();
});
