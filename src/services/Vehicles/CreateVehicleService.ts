import Vehicle from "../../models/Vehicle";
import VehiclesRepository from "../../repositories/Vehicles/VehiclesRepository";

import StorageProvider from '../../providers/StorageProvider';

interface IRequest {
  name: string;
  brand: string;
  daily_value: number;
  transmission_type: "manual" | "auto";
  fuel_type: 'gasoline' | 'alcohol' | 'energy';
  acceleration: number;
  maximun_speed: number;
  seats: number;
  potency: number;
  car_image: string;
}

export default class CreateVehicleService {
  public async run({
    name,
    brand,
    daily_value,
    transmission_type,
    fuel_type,
    acceleration,
    maximun_speed,
    seats,
    potency,
    car_image
  }: IRequest): Promise<Vehicle> {
    const vehicleRepository = new VehiclesRepository();
    const storageProvider = new StorageProvider();

    const checkedName = await vehicleRepository.findByName(name);
    if (checkedName) throw new Error("This vehicle is alredy registred");

    const fileName = await storageProvider.saveFile(car_image);

    const vehicle = await vehicleRepository.create({
      name,
      brand,
      daily_value,
      transmission_type,
      fuel_type,
      acceleration,
      maximun_speed,
      seats,
      potency,
      car_image: fileName
    });

    return vehicle
  }
}
