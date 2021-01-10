import { Router } from "express";

import SendForgotPasswordEmailController from "../controllers/Users/SendForgotPasswordEmailController";

const passwordRouter = Router();

const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();

passwordRouter.post("/forgot", sendForgotPasswordEmailController.create);

export default passwordRouter;
