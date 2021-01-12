import Vehicle from "../../models/Vehicle";

import VehiclesRepository from "../../repositories/Vehicles/VehiclesRepository";

import StorageProvider from '../../providers/StorageProvider'

interface IRequest {
  id: string;
  name: string;
  brand: string;
  daily_value: number;
  transmission_type: string;
  fuel_type: string;
  acceleration: number;
  maximun_speed: number;
  seats: number;
  potency: number;
  car_image: string;
}

export default class UpdateVehicleService {
  public async run({
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
  }: IRequest): Promise<Vehicle> {
    const vehiclesRepository = new VehiclesRepository();
    const storageProvider = new StorageProvider();

    const vehicle = await vehiclesRepository.findById(id);
    if (!vehicle) throw new Error("Invalid vehicle id");

    const checkedVehicleName = await vehiclesRepository.findByName(name);
    if (checkedVehicleName && name !== vehicle.name)
      throw new Error("This name is already in use");

    if(vehicle.car_image)
      await storageProvider.deleteFile(vehicle.car_image);

    const changedCarImage = await storageProvider.saveFile(car_image);

    vehicle.name = name;
    vehicle.brand = brand;
    vehicle.daily_value = daily_value;
    vehicle.transmission_type = transmission_type;
    vehicle.fuel_type = fuel_type;
    vehicle.acceleration = acceleration;
    vehicle.maximun_speed = maximun_speed;
    vehicle.seats = seats;
    vehicle.potency = potency;
    vehicle.car_image = changedCarImage;

    return vehiclesRepository.save(vehicle);
  }
}
