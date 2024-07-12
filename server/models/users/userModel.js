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

export const checkAdmin = async (userId) => {
  const user = await User.findById(userId);

  if (user.isCreator !== true)
    throw new UnAuthorizedError("Only creator is ascessible");
};

export const findUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new notFoundError("Unable to get user");
};
export const checkValue = async (value) => {
  // Regular expression to check if the value is an email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let result;
  if (emailRegex.test(value)) {
    result = await User.findOne({ email: value });
  } else {
    result = await User.findOne({ name: value });
  }
  if (!result) throw new BadRequestError("Unable to find user");
  return result;
};
