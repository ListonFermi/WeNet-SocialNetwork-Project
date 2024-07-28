import express from "express";
import startConsumer from "./rabbitmq/startConsumer";
import postsRoutes from "./routes/postsRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import reportsRoutes from "./routes/reportsRoutes";
import adminRoutes from "./routes/adminRoutes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();

const app = express();

/* 
const frontEndUrl = process.env.FRONTEND_URL;
const corsOptions = {
  origin: frontEndUrl,
  credentials: true,
};

app.use(cors(corsOptions)); 

// Handle preflight requests
app.options("*", cors(corsOptions));
*/
//test:
app.use(cors())

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/posts-service/comment", commentsRoutes);
app.use("/api/posts-service/report", reportsRoutes);
app.use("/api/posts-service/admin", adminRoutes);
app.use("/api/posts-service/", postsRoutes);

app.use(errorHandler);

startConsumer();

export default app;
