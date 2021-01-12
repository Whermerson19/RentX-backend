import { Router } from "express";
import multer from "multer";

import VehiclesController from "../controllers/Vehicles/VehiclesController";

import Auth from "../middlewares/Authorization";

import uploadConfig from "../config/upload";

/* --------------------------------- */

import f from "../repositories/Vehicles/VehiclesRepository";

/* --------------------------------- */

const vehicleRouter = Router();

const upload = multer(uploadConfig);

const auth = new Auth();
const vehiclesController = new VehiclesController();

vehicleRouter.post(
  "/create",
  auth.adminAuthorization,
  upload.single("car_image"),
  vehiclesController.create
);

vehicleRouter.get("/", auth.commonAuthorization, vehiclesController.index);

vehicleRouter.delete(
  "/delete/:id",
  auth.adminAuthorization,
  vehiclesController.delete
);

export default vehicleRouter;
