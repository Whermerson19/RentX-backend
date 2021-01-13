import { Request, Response } from "express";

import CreateVehicleService from "../../services/Vehicles/CreateVehicleService";
import DeleteVehicleService from "../../services/Vehicles/DeleteVehicleService";
import UpdateVehicleService from "../../services/Vehicles/UpdateVehicleService";
import { classToClass } from "class-transformer";

export default class VehiclesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createVehicle = new CreateVehicleService();

      const {
        name,
        brand,
        daily_value,
        transmission_type,
        fuel_type,
        acceleration,
        maximun_speed,
        seats,
        potency,
      } = request.body;

      const car_image = request.file.filename;

      const vehicle = await createVehicle.run({
        name,
        brand,
        daily_value: Number(daily_value),
        transmission_type,
        fuel_type,
        acceleration: Number(acceleration),
        maximun_speed: Number(maximun_speed),
        seats: Number(seats),
        potency: Number(potency),
        car_image,
      });

      return response.status(200).json(classToClass(vehicle));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const deleteVehicle = new DeleteVehicleService();

      const { id } = request.params;

      const vehicles = await deleteVehicle.run({ id });

      return response.status(200).json(classToClass(vehicles));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateVehicle = new UpdateVehicleService();

      const { id } = request.params;

      const car_image = request.file.filename;

      const {
        name,
        brand,
        daily_value,
        transmission_type,
        fuel_type,
        acceleration,
        maximun_speed,
        seats,
        potency,
      } = request.body;

      const updatedVehicle = await updateVehicle.run({
        id,
        name,
        brand,
        daily_value,
        transmission_type,
        fuel_type,
        acceleration,
        maximun_speed,
        seats,
        potency,
        car_image,
      });

      return response.status(200).json(classToClass(updatedVehicle));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
