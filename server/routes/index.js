import {Router} from "express";
import userRouter from "./userRouter";
import eventRouter from "./eventsRouter";
const indexRouter = Router();
indexRouter
.use("/api/users", userRouter)
.use("/api/events", eventRouter);
export default indexRouter;
