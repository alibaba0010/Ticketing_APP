import BadRequestError from "../../errors/badRequest";
import UnAuthorizedError from "../../errors/unauthorized";
import notFoundError from "../../errors/notFound";
import Event from "./eventDB";
import { stripe } from "../../utils/stripe";

export const requiredFields = (name, date, quantity, price) => {
  if (!name || !name || !date || !quantity || !price)
    throw new BadRequestError("Please fill all required field");
};
export const checkIfExists = async (eventId) => {
  const checkEventExist = await Event.findById(eventId);
  if (!checkEventExist) throw new notFoundError("Event not found");
  return checkEventExist;
};

export const checkDate = (date) => {
  const currentDate = new Date();
  const newDate = Date.parse(currentDate);
  if (Date.parse(date) <= newDate)
    throw new BadRequestError("Date cannot be in the past");
};

//NOT IMPLEMENTED YET
export const checkifEventAvailabile = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new notFoundError("Event not found");
  const currentDate = new Date();
  const newDate = Date.parse(currentDate);
  const eventDate = Date.parse(event.createdAt);
  if (newDate < eventDate)
    throw new UnAuthorizedError("Event has not started yet");
};

export const decrementQuantity = (quantity) => {
  return --quantity;
};
export const ticketBooked = (ticket) => {
  return ++ticket;
};
export const checkIfCreaator = async (userId) => {
  const checkCreator = await Event.find({ userId });
  if (checkCreator) throw new UnAuthorizedError("Creator cant book a ticket");
  return checkCreator;
};
export const checkIfTicketAvailable = async (eventId) => {
  const event = await Event.findById(eventId);
  if ((event.tickets[0].quantity = 0))
    throw new UnAuthorizedError("Ticket not available");
};

export const payTicket = async (event) => {
  const charge = await stripe.charges.create({
    currency: "usd",
    amount: order.price * 100,
    source: token,
  });
};

export const createPayment = async (event) => {
  const payment = await stripe.paymentIntents.create({
    amount: event.tickets[0].price * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });
  return payment;
};
