import { Router } from "express";
import multer from "multer";

import VehiclesController from "../controllers/Vehicles/VehiclesController";

import Auth from "../middlewares/Authorization";

import uploadConfig from "../config/upload";

import ListVehiclesWithFilterService from "../services/Vehicles/ListVehiclesWithFilterService";

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
  upload.single("car_image"),
  vehiclesController.update
);

vehicleRouter.get(
  "/list",
  auth.commonAuthorization,
  async (request, response) => {
    try {
      const list = new ListVehiclesWithFilterService();

      const { start_date, end_date } = request.query;
      const client_id = request.user.id;

      const data = await list.run({
        client_id,
        start_date: new Date(String(start_date)),
        end_date: new Date(String(end_date)),
      });

      return response.json(data)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
);

export default vehicleRouter;
