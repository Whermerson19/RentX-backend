import { getRepository } from "typeorm";
import Rentals from "../../models/Rentals";

import UsersRepository from "../../repositories/Users/UsersRepository";
import {
  isBefore,
  isWithinInterval,
  eachDayOfInterval,
  isEqual,
  isToday,
} from "date-fns";

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

    const user = await usersRepository.findById(client_id);
    if (!user) throw new Error("invalid user");

    const verifyCar = await rentalsRepository.findOne({
      where: {
        car_id,
      },
    });

    if (verifyCar) {
      const intervalVerifyCar = eachDayOfInterval({
        start: verifyCar.start_date,
        end: verifyCar.end_date,
      });

      const intervalNewRental = eachDayOfInterval({
        start: start_date,
        end: end_date,
      });

      for (let i = 0; i < intervalNewRental.length; i++) {
        for (let j = 0; j < intervalVerifyCar.length; j++) {
          if (isEqual(intervalNewRental[i], intervalVerifyCar[j]))
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
