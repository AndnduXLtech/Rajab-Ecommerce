import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { authUser, authAdmin } from "../Middlewares/authmiddleware.js";

const authRouter = express.Router();

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.loginUser);
authRouter.route("/logout").post(authController.logoutUser);

export default authRouter;
