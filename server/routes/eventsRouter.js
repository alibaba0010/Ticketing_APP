import { Router } from "express";
import EventsController from "../controllers/events.controller";
import { authenticateUser, verifyCreator, verifyUser } from "../utils/auth";

const eventRouter = Router();

eventRouter
  .post(
    "/:eventId/:ticketId",
    authenticateUser,
    verifyCreator,
    EventsController.httpAddNewEvent
  )
  // GET TOTAL NO OF TICKETS BOOKED FOR THE EVENT
  .get(
    "/:eventId/tickets",
    authenticateUser,
    verifyCreator,
    EventsController.httpGetTickets
  );
// .get("/:id", getTicketWithId)
// .patch("/:id", authentication, validateTicket, updateTicket);
export default eventRouter;
