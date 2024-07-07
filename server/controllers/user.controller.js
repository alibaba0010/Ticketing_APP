import { StatusCodes } from "http-status-codes";
import { getPagination } from "../utils/query";
import User from "../models/users/userDB";
import BadRequestError from "../errors/badRequest";
import notFoundError from "../errors/notFound";
import UnAuthenticatedError from "../errors/unaunthenticated";
import { sendEmail } from "../utils/Email";
import {
  checkAdmin,
  checkIfExists,
  comparePassword,
  findUser,
  requiredFields,
  checkValue,
} from "../models/users/userModel";

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

export default UsersController;