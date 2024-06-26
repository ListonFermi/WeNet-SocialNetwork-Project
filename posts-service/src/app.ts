import express from "express";
import startConsumer from "./rabbitmq/startConsumer";
import postsRoutes from "./routes/postsRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();

const app = express();

const frontEndUrl = process.env.FRONTEND_URL;
const corsOptions = {
  origin: frontEndUrl,
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/posts-service/", postsRoutes);
app.use("/api/posts-service/comment", commentsRoutes);


app.use(errorHandler);

startConsumer();

export default app;
