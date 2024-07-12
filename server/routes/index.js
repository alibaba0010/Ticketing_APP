import {Router} from "express";
import userRouter from "./userRouter";
import eventRouter from "./eventsRouter";
const ticketRouter = Router();
ticketRouter
.use("/users", userRouter)
.use("/events", eventRouter);
export default ticketRouter;
