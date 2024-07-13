import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest";
import notFoundError from "../errors/notFound";
import UnAuthenticatedError from "../errors/unaunthenticated";
import { sendEmail } from "../utils/Email";
import {
  checkCreator,
  checkIfExists,
  findUser,
  requiredFields,
  checkValue,
} from "../models/events/eventModel";

import UnAuthorizedError from "../errors/unauthorized.js";
import NotFoundError from "../errors/notFound.js";
import { Event } from "../models/events/eventDB.js";
import { v4 as uuidv4 } from "uuid";
class EventsController {
  static async httpAddNewEvent(request, response) {
    const { userId } = request.user;
    const { name, description, date, quantity, price } = request.body;
    requiredFields(name, name, date, quantity, price);

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
}
export default EventsController;
