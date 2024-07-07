import { StatusCodes } from "http-status-codes";
import { getPagination } from "../services/query.js";
import User from "../model/user/user.mongo.js";
import BadRequestError from "../errors/badRequest.js";
import notFoundError from "../errors/notFound.js";
import UnAuthenticatedError from "../errors/unaunthenticated.js";
import { sendEmail } from "../services/Email.js";
import {
  checkAdmin,
  checkIfExists,
  comparePassword,
  findUser,
  requiredFields,
  checkValue,
} from "../model/user/user.model.js";

import dotenv from "dotenv";
import UnAuthorizedError from "../errors/unauthorized.js";
import NotFoundError from "../errors/notFound.js";
class UsersController {
  static async httpAddNewUser(request, response) {
    const { username, email, password, confirmPassword } = req.body;

    comparePassword(password, confirmPassword);

    requiredFields(username, email, password, confirmPassword);

    await checkIfExists(email, username);

    const user = await User.create({ username, email, password });
    res
      .status(StatusCodes.CREATED)
      .json({ username: user.username, email: user.email, id: user._id });
  }
}
