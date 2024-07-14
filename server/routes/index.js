import express from "express";
import userRouter from "./userRouter";
import eventRouter from "./eventsRouter";
import { errorHandler } from "../errors/error.js";
import { routeError } from "../errors/route.error.js";
const indexRouter = express();
indexRouter
  .use(json())
  .use("/api/users", userRouter)
  .use("/api/events", eventRouter)
  .use(routeError)
  .use(errorHandler);
export default indexRouter;
