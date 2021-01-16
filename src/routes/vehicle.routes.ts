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

      const { start_date, end_date, range_value_start, range_value_end, brand, fuel_type, transmission_type } = request.query;
      const client_id = request.user.id;

      const data = await list.run({
        client_id,
        start_date: new Date(String(start_date)),
        end_date: new Date(String(end_date)),
        range_value: {start: Number(range_value_start), end: Number(range_value_end)},
        brand: String(brand),
        fuel_type: String(fuel_type),
        transmission_type: String(transmission_type)
      });

      return response.json(data)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
);

export default vehicleRouter;
