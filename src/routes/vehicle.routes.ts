import { Router } from "express";
import multer from "multer";

import VehiclesController from "../controllers/Vehicles/VehiclesController";

import Auth from "../middlewares/Authorization";

import uploadConfig from "../config/upload";

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

vehicleRouter.delete(
  "/delete/:id",
  auth.adminAuthorization,
  vehiclesController.delete
);

vehicleRouter.put(
  "/update/:id",
  auth.adminAuthorization,
  upload.single('car_image'),
  vehiclesController.update
);

export default vehicleRouter;
