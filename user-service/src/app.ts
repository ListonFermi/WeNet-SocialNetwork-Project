import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { errorHandler } from "../src/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user-service/", userRoutes);
app.use(errorHandler);

export default app;
