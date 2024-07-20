import { Router } from "express";
import EventsController from "../controllers/events.controller";
import { authenticateUser, verifyCreator, verifyUser } from "../utils/auth";

const eventRouter = Router();

eventRouter
  .post(
    "/event",
    authenticateUser,
    verifyCreator,
    EventsController.httpAddNewEvent
  )
  .post("/:eventId/:ticketId", EventsController.httpBookTicket)
  // GET TOTAL NO OF TICKETS BOOKED FOR THE EVENT
  .get(
    "/:eventId/tickets",
    authenticateUser,
    verifyCreator,
    EventsController.httpGetTickets
  );
// .patch("/:id", authentication, validateTicket, updateTicket);
export default eventRouter;
