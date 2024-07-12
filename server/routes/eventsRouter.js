import { Router } from "express";
import EventsController from "../controllers/events.controller";
import { authenticateUser, verifyCreator, verifyUser } from "../utils/auth";

const eventRouter = Router();

eventRouter.post(
  "/:eventId/:ticketId",
  authenticateUser,
  verifyCreator,
  EventsController.httpAddNewEvent
)
.get("/:eventId/tickets", EventsController.httpGetTickets)
// .get("/:id", getTicketWithId)
// .patch("/:id", authentication, validateTicket, updateTicket);
export default eventRouter;
