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
    const { username, email, password, confirmPassword } = request.body;

    comparePassword(password, confirmPassword);

    requiredFields(username, email, password, confirmPassword);

    await checkIfExists(email, username);

    const user = await User.create({ username, email, password });
    response
      .status(StatusCodes.CREATED)
      .json({ username: user.username, email: user.email, id: user._id });
  }
  // FOR ADMIN
  static async httpAddNewAdmin(request, response) {
    const creator = request.body;
    creator.isCreator = true;
    const { username, email, password, confirmPassword, isCreator } = creator;

    comparePassword(password, confirmPassword);

    requiredFields(username, email, password, confirmPassword);
    await checkIfExists(email, username);
    const user = await User.create({ username, email, password, isCreator });
    response
      .status(StatusCodes.CREATED)
      .json({ username: user.username, email: user.email, id: user._id });
  }
  // LOGIN
  static async httpLogin(request, response) {
    const { value, password } = request.body;
    if (!value || !password)
      throw new BadRequestError("Provide a username or email and password");
    const user = await checkValue(value);
    const comparePassword = await user.comparePassword(password);
    if (!comparePassword) throw new UnAuthenticatedError("Invalid Password");
    const token = await user.createJWT();
    request.session = {
      jwt: token,
    };
    response
      .status(StatusCodes.OK)
      .json({ id: user.id, username: user.username });
  }

  // UPDATE USER
  static async updateUser(request, response) {
    const { username } = request.body;
    const { userId } = request.user;

    if (!username) throw new BadRequestError("Username field cannot be empty");

    const user = await User.findById(userId);
    if (!user) throw new notFoundError("User not Found");

    user.username = username;

    const updatedUser = await user.save();

    const { email, id } = updatedUser;

    response
      .status(StatusCodes.OK)
      .json({ username: updatedUser.username, email, id });
  }

  // GET ALL USERS
  static async getAllUserByAdmin(request, response) {
    const { userId } = request.user;

    await checkAdmin(userId);

    const { skip, limit } = getPagination(request.query);
    const users = await User.find({}, { __v: 0, password: 0 })
      .sort("createdAt")
      .skip(skip)
      .limit(limit);

    if (!users) throw new notFoundError("Unable to get Users");

    return response
      .status(StatusCodes.OK)
      .json({ users, nbHits: users.length });
  }

  // SHOW CURRENT USER
  static showCurrentUser = async (request, response) => {
    const { userId } = request.user;
    const user = await User.findById(userId);
    if (!user) throw new notFoundError("Unable to get User");

    const { username, id, email, isCreator } = user;

    return response
      .status(StatusCodes.OK)
      .json({ username, id, email, isCreator });
  };

  // LOGOUT USER
  static logOutUser = async (request, response) => {
    const { userId } = request.user;
    await findUser(userId);

    request.session = null;
    return response
      .status(StatusCodes.OK)
      .json({ msg: "Successfully logged out" });
  };
}

export default UsersController;
