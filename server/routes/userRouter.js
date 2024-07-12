import { Router } from "express";

const userRouter = Router();

//   httpLogin,
//   updateUser,
//   getAllUserByCreator,
//   getUserByCreator,
//   showCurrentUser,
//   updateUserPassword,
//   logOutUser,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/user.controller";
import UsersController from "../controllers/user.controller";
import { authenticateUser, verifyCreator, verifyUser } from "../utils/auth";

userRouter
  // @desc Register User
  // @route POST /api/v1/users/register
  // @access Public
  .post("/users/register", UsersController.httpAddNewUser)
  .post("/creator/register", UsersController.httpAddNewCreator)
  .post("/users/login", UsersController.httpLogin)
  //update user already  logged in with his token verification
  .patch(
    "/users/user",
    authenticateUser,
    verifyUser,
    UsersController.updateUser
  )
  //get users who has booked the tickets
  .get(
    "/users",
    authenticateUser,
    verifyCreator,
    UsersController.getAllUserByCreator
  )
  .get("/user", authenticateUser, verifyUser, UsersController.showCurrentUser)

  .get(
    "/users/logout",
    authenticateUser,
    verifyUser,
    UsersController.logOutUser
  );

export default userRouter;
