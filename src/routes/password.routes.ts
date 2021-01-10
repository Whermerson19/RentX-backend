import { Router } from "express";

import SendForgotPasswordEmailController from "../controllers/Users/SendForgotPasswordEmailController";
import ResetPasswordController from "../controllers/Users/ResetPasswordController";

const passwordRouter = Router();

const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", sendForgotPasswordEmailController.create);

passwordRouter.put('/reset/:token', resetPasswordController.create)

export default passwordRouter;
