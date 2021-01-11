import Vehicle from '../../models/Vehicle'

export interface ICreateVehicle {
  name: string;
  brand: string;
  daily_value: number;
  transmission_type: string;
  fuel_type: string;
  acceleration: number;
  maximun_speed: number;
  seats: number;
  potency: number;
}


export default interface IVehiclesRepository {
  create(data: ICreateVehicle): Promise<Vehicle>
  save(vehicle: Vehicle): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle | undefined>;
  findByFuelType(fuel_type: string): Promise<Vehicle | undefined>;
  findByDailyValue(daily_value: number): Promise<Vehicle | undefined>;
  findByTransmissionType(transmission_type: string): Promise<Vehicle | undefined>;
  findByName(name: string): Promise<Vehicle | undefined>;
}