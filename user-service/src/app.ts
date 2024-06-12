import express from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";
import { errorHandler } from "../src/middlewares/errorHandler";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

const frontEndUrl = process.env.FRONTEND_URL;
const corsOptions = {
  origin: frontEndUrl, // Replace with your frontend domain
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use("/api/user-service/", userRoutes);
app.use("/api/user-service/admin/", adminRoutes);
app.use(errorHandler);

export default app;
