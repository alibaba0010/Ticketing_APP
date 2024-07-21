import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest";
import Ticket from "../models/events/ticketDB";
import {
  checkDate,
  checkIfCreaator,
  checkIfExists,
  decrementQuantity,
  requiredFields,
  ticketBooked,
} from "../models/events/eventModel";
import { checkCreator, findUser } from "../models/users/userModel";
import Event from "../models/events/eventDB.js";
import { v4 as uuidv4 } from "uuid";
class EventsController {
  static async httpAddNewEvent(request, response) {
    const { userId } = request.user;
    const { name, description, date, quantity, price } = request.body;
    requiredFields(name, date, quantity, price);
    checkDate(date);

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

    response.status(StatusCodes.CREATED).json({
      name: eventCreated.name,
      description: eventCreated.description,
      date: eventCreated.date,
    });
  }

  static async httpGetEvents(request, response) {
    const { userId } = request.user;
    const events = await Event.find({ userId });
    return response
      .status(StatusCodes.OK)
      .json({ events, nbHits: events.length });
  }
  static async httpGetTickets(request, response) {
    const { userId } = request.user;
  }
  static async httpBookTicket(request, response) {
    const { userId } = request.user;
    await checkIfCreaator(userId);

    await findUser(userId);
    const { eventId } = request.params;

    const event = await checkIfExists(eventId);
    const quantity = event.tickets[0].quantity;
    const ticket = event.tickets[0].isBooked;
    const newQuantity = decrementQuantity(quantity);
    const booked = ticketBooked(ticket);
    const ticketId = event.tickets[0].id;

    await Ticket.create({
      userId,
      eventId,
      ticketId,
      price: event.tickets[0].price,
    });

    event.tickets[0].isBooked = booked;
    event.tickets[0].quantity = newQuantity;
    await event.save();
    response
      .status(StatusCodes.OK)
      .json({ message: "Ticket booked successfully" });
  }
}
export default EventsController;
