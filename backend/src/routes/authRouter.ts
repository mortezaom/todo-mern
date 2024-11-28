import { AuthValidator } from "../validators";
import { AuthController } from "../controllers";

import { Router, type Router as ExpressRouter } from "express";

export const authRouter: ExpressRouter = Router();

authRouter.post(
	"/register",
	AuthValidator.registerValidator(),
	AuthController.registerController,
);

authRouter.post(
	"/login",
	AuthValidator.loginValidator(),
	AuthController.loginController,
);
