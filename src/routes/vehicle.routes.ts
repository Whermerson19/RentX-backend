import { Router } from "express";

import VehiclesController from "../controllers/Vehicles/VehiclesController";

import Auth from "../middlewares/Authorization";

const vehicleRouter = Router();

const auth = new Auth();
const vehiclesController = new VehiclesController();

vehicleRouter.post(
  "/create",
  auth.adminAuthorization,
  vehiclesController.create
);

export default vehicleRouter;
