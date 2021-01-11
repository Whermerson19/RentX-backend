import VehiclesRepository from '../../repositories/Vehicles/VehiclesRepository'

export default class ListAllVehiclesService {
  public async run() {
    const vehiclesRepository = new VehiclesRepository()
    
    const vehicles = await vehiclesRepository.listAllVehicles();

    return vehicles;
  }
}