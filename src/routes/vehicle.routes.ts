import { Router } from "express";
import multer from 'multer';

import VehiclesController from "../controllers/Vehicles/VehiclesController";

import Auth from "../middlewares/Authorization";

import uploadConfig from '../config/upload';

const vehicleRouter = Router();

const upload = multer(uploadConfig);

const auth = new Auth();
const vehiclesController = new VehiclesController();

vehicleRouter.post(
  "/create",
  auth.adminAuthorization,
  upload.single('car_image'),
  vehiclesController.create
);

vehicleRouter.get('/', auth.commonAuthorization, vehiclesController.index)

export default vehicleRouter;
