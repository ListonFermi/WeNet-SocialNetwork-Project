import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import notificationRoutes from './routes/notificationRoutes'
import { errorHandler } from "./middlewares/errorHandler";
import startConsumer from "./rabbitMQ/startConsumer";
import dotenv from "dotenv";
dotenv.config()
import { Server } from "socket.io";
import { initializeSocketIO } from "./socket";

const app = express();

const httpServer = http.createServer(app);

const frontEndUrl = process.env.FRONTEND_URL;
const corsOptions = {
  origin: frontEndUrl,
  credentials: true,
};

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: corsOptions,
});

app.set("io", io);
app.use(cors(corsOptions));
// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/notification-service/", notificationRoutes);

initializeSocketIO(io);

app.use(errorHandler);

startConsumer()

export default httpServer;