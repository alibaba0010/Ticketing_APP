import express, { json } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import userRouter from "./routes/index.js";
import dotenv from "dotenv";
import { errorHandler } from "./errors/error.js";
import { routeError } from "./errors/route.error.js";
dotenv.config();

const app = express();
app
  .use(cors())
  .use(json())
  .use(
    cookieSession({
      signed: false,
      secure: false, //process.env.NODE_ENV !== "test"
      maxAge: 24 * 60 * 60 * 1000,
    })
  ) 
  .use("/api/v1", userRouter)

  .use(routeError)
  .use(errorHandler);

export default app;