import BadRequestError from "../../errors/badRequest";
import UnAuthorizedError from "../../errors/unauthorized";
import notFoundError from "../../errors/notFound";
import Event from "./eventDB";
import Ticket from "./ticketDB";

export const requiredFields = (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword)
    throw new BadRequestError("Please fill all required field");
};
