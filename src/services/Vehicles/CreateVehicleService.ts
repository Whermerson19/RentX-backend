import Vehicle from "../../models/Vehicle";
import VehiclesRepository from "../../repositories/Vehicles/VehiclesRepository";

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
  }: IRequest): Promise<Vehicle> {
    const vehicleRepository = new VehiclesRepository();

    const checkedName = await vehicleRepository.findByName(name);
    if (checkedName) throw new Error("This vehicle is alredy registred");

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
    });

    return vehicle
  }
}
