import BadRequestError from "../../errors/badRequest";
import UnAuthorizedError from "../../errors/unauthorized";
import notFoundError from "../../errors/notFound";
import User from "./userDB";

export const comparePassword = (password, confirmPassword) => {
  if (password !== confirmPassword)
    throw new BadRequestError("Password doesn't match");
};
export const requiredFields = (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword)
    throw new BadRequestError("Please fill all required field");
};

export const checkIfExists = async (email, name) => {
  const checkEmailExist = await User.findOne({ email });
  const checkUsernameExist = await User.findOne({ name });

  if (checkEmailExist || checkUsernameExist)
    throw new BadRequestError("Email or name already exists");
};

export const checkCreator = async (userId) => {
  const user = await User.findById(userId);

  if (user.isCreator !== true)
    throw new UnAuthorizedError("Only creator is ascessible");
};

export const findUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new notFoundError("Unable to get user");
};
