import Vehicle from "../../models/Vehicle";

import VehiclesRepository from "../../repositories/Vehicles/VehiclesRepository";

interface IRequest {
  id: string;
}

export default class DeleteVehicleService {
  public async run({ id }: IRequest): Promise<Vehicle[]> {
    const vehiclesRepository = new VehiclesRepository();

    const vehicles = await vehiclesRepository.remove(id);

    return vehicles;
  }
}
