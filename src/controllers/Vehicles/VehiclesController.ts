import { Request, Response } from "express";

import CreateVehicleService from "../../services/Vehicles/CreateVehicleService";
import ListAllVehiclesService from "../../services/Vehicles/ListAllVehiclesService";

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

      console.log(request.body)
      console.log(typeof daily_value)

      const car_image = request.file.filename ;

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
        car_image
      });

      return response.status(200).json(vehicle);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listAllVehiclesService = new ListAllVehiclesService();

      const vehicles = await listAllVehiclesService.run();

      return response.status(200).json(vehicles);
    } catch(err) {
      return response.status(400).json({ error: err.message })
    }
  }
}
