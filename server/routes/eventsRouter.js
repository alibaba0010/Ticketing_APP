// import { authentication, validateRequest, validateTicket } from "../utils/auth";
import { Router } from "express";
// import {
//   createEvent,
//   createTicket,
//   getTicketWithId,  
//   getTickets,
// } from "../controllers/tickets.controller.js";

const eventRouter = Router();

eventRouter
  // .post("/", authentication, validateTicket, validateRequest, createTicket)
  // .get("/", getTickets)
  // .get("/:id", getTicketWithId)
  // .patch("/:id", authentication, validateTicket, updateTicket);
export default eventRouter;
