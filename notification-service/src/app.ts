import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import notificationRoutes from './routes/notificationRoutes'
import { errorHandler } from "./middlewares/errorHandler";
import startConsumer from "./rabbitMQ/startConsumer";
import dotenv from "dotenv";
dotenv.config()

const app = express();

// /* 
const frontEndUrl = process.env.FRONTEND_URL;
const corsOptions = {
  origin: frontEndUrl,
  credentials: true,
};

app.use(cors(corsOptions)); 

// Handle preflight requests
app.options("*", cors(corsOptions));
// */ 

/*test:
app.use(cors())
*/

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/notification-service/", notificationRoutes);

app.use(errorHandler);

startConsumer()

export default app;