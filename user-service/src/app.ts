import express from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";
import { errorHandler } from "../src/middlewares/errorHandler";
import cookieParser from "cookie-parser";
import morgan from "morgan";

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


app.use("/api/user-service/", userRoutes);
app.use("/api/user-service/admin/", adminRoutes);

// // test:

// app.use("/", userRoutes);
// app.use("/admin/", adminRoutes);

app.use(errorHandler);

export default app;
