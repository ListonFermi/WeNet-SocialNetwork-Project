import express from "express";
import { postRoutes } from "../interface/routes/postRoutes";
import startConsumer from "./rabbitmq/startConsumer";
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json());
app.use("/posts", postRoutes);

startConsumer()


export default app;
