import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import StartRentService from "../../services/Rentals/StartRentService";

export default class RentalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const startRent = new StartRentService();

      const client_id = request.user.id;
      const { car_id } = request.params;

      const { start_date, end_date } = request.query;

      const rentals = await startRent.run({
        client_id,
        car_id,
        start_date: new Date(`${start_date}`),
        end_date: new Date(`${end_date}`),
      });

      return response.status(200).json(classToClass(rentals));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
