import BadRequestError from "../../errors/badRequest";
import UnAuthorizedError from "../../errors/unauthorized";
import notFoundError from "../../errors/notFound";
import Event from "./eventDB";

export const requiredFields = (name, email, password, confirmPassword) => {
  if (!name || !name || !date || !quantity || !price)
    throw new BadRequestError("Please fill all required field");
};
export const checkIfExists = async (eventId) => {
  const checkEventExist = await Event.findById(eventId);

  if (!checkEventExist)
    throw new notFoundError("Event not found");
};