import {
   authentication,
   validateRequest,
   validateTicket,
 } from "utils/auth";
 import { Request, Response, Router } from "express";
 import {
   createTicket,
   getTicketWithId,
   updateTicket,
   getTickets,
 } from "../controllers/tickets.controller";
 
 const ticketRouter = Router();
 
 ticketRouter
   .post("/", authentication, validateTicket, validateRequest, createTicket)
   .get("/", getTickets)
   .get("/:id", getTicketWithId)
   .patch("/:id", authentication, validateTicket, updateTicket);
 export default ticketRouter;