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
  // CREATE NEW USER
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
  // FOR ADMIN
  static async httpAddNewAdmin(request, response) {
    const admin = req.body;
    admin.isAdmin = true;
    const { username, email, password, confirmPassword, isAdmin } = admin;

    comparePassword(password, confirmPassword);

    requiredFields(username, email, password, confirmPassword);
    await checkIfExists(email, username);
    const user = await User.create({ username, email, password, isAdmin });
    res
      .status(StatusCodes.CREATED)
      .json({ username: user.username, email: user.email, id: user._id });
  }
  // LOGIN
  static async httpLogin(request, response) {
    const { value, password } = req.body;
    if (!value || !password)
      throw new BadRequestError("Provide a username or email and password");
    const user = await checkValue(value);
    const comparePassword = await user.comparePassword(password);
    if (!comparePassword) throw new UnAuthenticatedError("Invalid Password");
    const token = await user.createJWT();
    req.session = {
      jwt: token,
    };
    res.status(StatusCodes.OK).json({ id: user.id, username: user.username });
  }
}

export default UsersController;
