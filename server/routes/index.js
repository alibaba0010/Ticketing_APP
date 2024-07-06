import express from "express";
import userRouter from "./userRoute";

const ticketRouter = express();

ticketRouter.use("/", userRouter);

export default ticketRouter;
