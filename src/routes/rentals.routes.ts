import { Router } from "express";

import RentalsController from "../controllers/Rentals/RentalsController";

import Authorization from "../middlewares/Authorization";

const rentalsRouter = Router();

const auth = new Authorization();
const rentalsController = new RentalsController();

rentalsRouter.post(
  "/start/:car_id",
  auth.clientAuthorization,
  rentalsController.create
);

export default rentalsRouter;
