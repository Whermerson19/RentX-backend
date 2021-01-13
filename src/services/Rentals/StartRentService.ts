import { getRepository } from "typeorm";
import Rentals from "../../models/Rentals";

import UsersRepository from "../../repositories/Users/UsersRepository";
import VehiclesRepository from "../../repositories/Vehicles/VehiclesRepository";
import { isBefore, eachDayOfInterval, isEqual, isToday } from "date-fns";

interface IRequest {
  car_id: string;
  client_id: string;
  start_date: Date;
  end_date: Date;
}

export default class StartRentService {
  public async run({
    car_id,
    client_id,
    start_date,
    end_date,
  }: IRequest): Promise<Rentals> {
    const rentalsRepository = getRepository(Rentals);
    const usersRepository = new UsersRepository();
    const vehiclesRepository = new VehiclesRepository();

    const user = await usersRepository.findById(client_id);
    if (!user) throw new Error("invalid user");

    const existsCar = await vehiclesRepository.findById(car_id);
    if (!existsCar) throw new Error("Invalid car_id");

    const checkedCarInRentals = await rentalsRepository.findOne({
      where: {
        car_id,
      },
    });

    if (checkedCarInRentals) {
      const checkedCarInRentalsInterval = eachDayOfInterval({
        start: checkedCarInRentals.start_date,
        end: checkedCarInRentals.end_date,
      });

      const createRentalsInterval = eachDayOfInterval({
        start: start_date,
        end: end_date,
      });

      for (let i = 0; i < createRentalsInterval.length; i++) {
        for (let j = 0; j < checkedCarInRentalsInterval.length; j++) {
          if (isEqual(createRentalsInterval[i], checkedCarInRentalsInterval[j]))
            throw new Error("This car is already rented");
        }
      }
    }

    if (isBefore(start_date, new Date(Date.now())) && !isToday(start_date))
      throw new Error("You can't schedule a rent in a past date");

    if (isBefore(end_date, start_date))
      throw new Error("EndDate must be after StartDate");

    const rentals = rentalsRepository.create({
      car_id,
      client_id,
      start_date,
      end_date,
    });

    await rentalsRepository.save(rentals);

    return rentals;
  }
}
