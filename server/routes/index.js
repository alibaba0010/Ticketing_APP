import {Router} from "express";
import userRouter from "./userRouter";
import eventRouter from "./eventsRouter";
const ticketRouter = Router();
ticketRouter
.use("/user", userRouter)
.use("/event", eventRouter);
export default ticketRouter;
