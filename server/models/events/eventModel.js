import BadRequestError from "../../errors/badRequest";
import UnAuthorizedError from "../../errors/unauthorized";
import notFoundError from "../../errors/notFound";
import Event from "./eventDB";

export const requiredFields = (name, date, quantity, price) => {
  if (!name || !name || !date || !quantity || !price)
    throw new BadRequestError("Please fill all required field");
};
export const checkIfExists = async (eventId) => {
  console.log(eventId);
  const checkEventExist = await Event.findById(eventId);
  console.log(checkEventExist);
  if (!checkEventExist) throw new notFoundError("Event not found");
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
