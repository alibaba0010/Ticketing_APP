import { Router } from "express";

const userRouter = Router();

//   httpLogin,
//   updateUser,
//   getAllUserByAdmin,
//   getUserByAdmin,
//   showCurrentUser,
//   updateUserPassword,
//   logOutUser,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/user.controller";
import UsersController from "../controllers/user.controller";
import { authenticateUser, verifyAdmin, verifyUser } from "../utils/auth";

userRouter
  // @desc Register User
  // @route POST /api/v1/users/register
  // @access Public
  .post("/users/register", UsersController.httpAddNewUser)
  .post("/creator/register", UsersController.httpAddNewAdmin)
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
    verifyAdmin,
    UsersController.getAllUserByAdmin
  )
  .get("/user", authenticateUser, verifyUser, UsersController.showCurrentUser)

  .get(
    "/users/logout",
    authenticateUser,
    verifyUser,
    UsersController.logOutUser
  );

export default userRouter;
