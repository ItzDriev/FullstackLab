import express from "express";
//Allows website to accept requests from other websites
import cors from "cors";
//Logs HHTP requests
import morgan from "morgan";
//Needed to read cookies
import cookieParser from "cookie-parser";
import { mainRouter } from "./routes/routes.ts";

export const app = express();

//Logs every http request to the console like this  "GET /users 200 8.421 ms - 18" or "POST /login 401 12.113 ms - 35"
app.use(morgan("dev"));
app.use(cookieParser());
//Needed for secure cookies,
app.set("trust proxy", 1);

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(mainRouter);
