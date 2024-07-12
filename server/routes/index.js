import {Router} from "express";
import userRouter from "./userRouter";
import eventRouter from "./eventsRouter";
const indexRouter = Router();
indexRouter
.use("/users", userRouter)
.use("/events", eventRouter);
export default indexRouter;
