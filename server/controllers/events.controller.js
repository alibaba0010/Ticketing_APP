import { StatusCodes } from "http-status-codes";
import { getPagination } from "../utils/query";
import User from "../models/users/userDB";
import BadRequestError from "../errors/badRequest";
import notFoundError from "../errors/notFound";
import UnAuthenticatedError from "../errors/unaunthenticated";
import { sendEmail } from "../utils/Email";
import {
  checkCreator,
  checkIfExists,
  comparePassword,
  findUser,
  requiredFields,
  checkValue,
} from "../models/events/eventModel";

import dotenv from "dotenv";
import UnAuthorizedError from "../errors/unauthorized.js";
import NotFoundError from "../errors/notFound.js";
class EventsController {
  static async httpAddNewEvent(request, response) {
    const { name, description, date, quantity, price } = request.body;
    requiredFields(name, name, date, quantity, price);
  }
}

export default EventsController;
