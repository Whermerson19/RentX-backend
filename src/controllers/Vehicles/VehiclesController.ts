import { Request, Response } from "express";

import CreateVehicleService from "../../services/Vehicles/CreateVehicleService";

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

      const vehicle = await createVehicle.run({
        name,
        brand,
        daily_value,
        transmission_type,
        fuel_type,
        acceleration,
        maximun_speed,
        seats,
        potency,
      });

      return response.status(200).json(vehicle);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
