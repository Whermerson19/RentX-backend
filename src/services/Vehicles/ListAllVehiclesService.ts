import Vehicle from "../../models/Vehicle";
import VehiclesRepository from "../../repositories/Vehicles/VehiclesRepository";

interface IRequest {
  filter: string;
  page: number;
}

export default class ListAllVehiclesService {
  public async run({ filter, page }: IRequest): Promise<Vehicle[]> {
    const vehiclesRepository = new VehiclesRepository();

    const vehicles = await vehiclesRepository.listFilteredVehicles(
      filter,
      page
    );

    return vehicles;
  }
}
