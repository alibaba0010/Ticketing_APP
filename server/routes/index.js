import express, { json } from "express";
import userRouter from "./userRouter.js";
import "express-async-errors";
// import eventRouter from "./eventsRouter";
import { errorHandler } from "../errors/error.js";
import { routeError } from "../errors/route.error.js";
const indexRouter = express();
indexRouter
  .use(json())
  .use("/users", userRouter)
  // .use("/api/events", eventRouter)

  .use(routeError)
  .use(errorHandler);
export default indexRouter;
