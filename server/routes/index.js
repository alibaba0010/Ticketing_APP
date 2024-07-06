import express from "express";
import userRouter from "./userRouter";
import eventRouter from "./eventRouter";
const ticketRouter = Router();
ticketRouter.use("/user", userRouter).use("/event", eventRouter);
export default ticketRouter;
