import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest";
import notFoundError from "../errors/notFound";
import UnAuthenticatedError from "../errors/unaunthenticated";
import { sendEmail } from "../utils/Email";
import { checkIfExists, requiredFields } from "../models/events/eventModel";
import { checkCreator, findUser } from "../models/users/userModel";

import UnAuthorizedError from "../errors/unauthorized.js";
import NotFoundError from "../errors/notFound.js";
import { Event } from "../models/events/eventDB.js";
import { v4 as uuidv4 } from "uuid";
class EventsController {
  static async httpAddNewEvent(request, response) {
    const { userId } = request.user;
    const { name, description, date, quantity, price } = request.body;
    requiredFields(name, date, quantity, price);

    const eventCreated = await Event.create({
      name,
      description,
      userId,
      date,
      tickets: [
        {
          id: uuidv4(),
          price,
          quantity,
        },
      ],
    });

    console.log(`Event created ${eventCreated}`);
    response.status(StatusCodes.CREATED).json({
      name: eventCreated.name,
      email: eventCreated.email,
      id: user._id,
    });
  }

  static async httpGetTickets(request, response) {
    const { userId } = request.user;
  }
  static async httpBookTicket(request, response) {
    const { userId } = request.user;
    const { eventId, ticketId } = request.params;
    const event = await checkIfExists(eventId);
    const user = await findUser(userId);

    const ticket = event.tickets.find((t) => t.id === ticketId);
    console.log(`Ticket ${ticket}`);
    if (!ticket) throw new NotFoundError("Ticket not found");

    if (ticket.quantity <= 0) throw new BadRequestError("Ticket sold out");

    await ticket.updateOne({ quantity: ticket.quantity - 1 });

    response
      .status(StatusCodes.OK)
      .json({ message: "Ticket booked successfully" });
  }
}
export default EventsController;
