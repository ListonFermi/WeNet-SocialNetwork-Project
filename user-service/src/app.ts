import express from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";
import { errorHandler } from "../src/middlewares/errorHandler";
import cookieParser from "cookie-parser";

const app = express();

const frontEndUrl= process.env.FRONTEND_URL;
const corsOptions = {
  origin: frontEndUrl, // Replace with your frontend domain
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use("/api/user-service/", userRoutes);
app.use("/api/user-service/admin/", adminRoutes);
app.use(errorHandler);

export default app;
