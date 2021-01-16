import Vehicles from "../../models/Vehicle";

import UsersRepository from "../../repositories/Users/UsersRepository";
import VehiclesRepository from "../../repositories/Vehicles/VehiclesRepository";

import { eachDayOfInterval, isEqual } from "date-fns";
import { getRepository } from "typeorm";
import Rentals from "../../models/Rentals";

interface IRequest {
  client_id: string;
  start_date: Date;
  end_date: Date;
  brand?: string;
  range_value?: number[];
  fuel_type?: string;
  transmission_type?: string;
}

export default class ListVehiclesWithFilterService {
  public async run({
    client_id,
    start_date,
    end_date,
    brand,
    range_value,
    fuel_type,
    transmission_type,
  }: IRequest): Promise<Vehicles[]> {
    const usersRepository = new UsersRepository();
    const vehiclesRepository = new VehiclesRepository();
    const rentalsRepository = getRepository(Rentals);

    const user = await usersRepository.findById(client_id);
    if (!user) throw new Error("Invalid user");

    const allVehicles = await vehiclesRepository.listAllVehicles();
    const rentedVehicles = await rentalsRepository.find();

    const filteredVehiclesPerDate: Vehicles[] = [];

    const filterRentedVehiclesPerDate = rentedVehicles
      .map((curr) => {
        const rentedInterval = eachDayOfInterval({
          start: curr.start_date,
          end: curr.end_date,
        });

        const filterInterval = eachDayOfInterval({
          start: start_date,
          end: end_date,
        });

        return {
          id: curr.car_id,
          rentedInterval,
          filterInterval,
        };
      })
      .filter((curr) => {
        for (let i = 0; i < curr.filterInterval.length; i++) {
          for (let j = 0; j < curr.rentedInterval.length; j++) {
            if (isEqual(curr.filterInterval[i], curr.rentedInterval[j]))
              return curr;
          }
        }
      });

    for (let i = 0; i < allVehicles.length; i++) {
      if (filterRentedVehiclesPerDate.length)
        for (let j = 0; j < filterRentedVehiclesPerDate.length; j++) {
          if (allVehicles[i].id !== filterRentedVehiclesPerDate[j].id)
            filteredVehiclesPerDate.push(allVehicles[i]);
        }
      else filteredVehiclesPerDate.push(allVehicles[i]);
    }
    return filteredVehiclesPerDate;
  }
}
