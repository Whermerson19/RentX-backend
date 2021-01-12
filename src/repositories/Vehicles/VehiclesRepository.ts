import { getRepository, LessThanOrEqual, Not, Repository } from "typeorm";
import Vehicle from "../../models/Vehicle";
import IVehiclesRepository, { ICreateVehicle } from "./IVehiclesRepository";

export default class VehiclesRepository implements IVehiclesRepository {
  private ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async create({
    name,
    brand,
    transmission_type,
    acceleration,
    seats,
    fuel_type,
    daily_value,
    maximun_speed,
    potency,
    car_image,
  }: ICreateVehicle): Promise<Vehicle> {
    const vehicle = this.ormRepository.create({
      name,
      brand,
      transmission_type,
      acceleration,
      seats,
      fuel_type,
      daily_value,
      maximun_speed,
      potency,
      car_image,
    });

    await this.ormRepository.save(vehicle);

    return vehicle;
  }

  public async save(vehicle: Vehicle): Promise<Vehicle> {
    return this.ormRepository.save(vehicle);
  }

  public async findById(id: string): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return vehicle;
  }

  public async findByFuelType(fuel_type: string): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: {
        fuel_type,
      },
    });

    return vehicle;
  }

  public async findByDailyValue(
    daily_value: number
  ): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: {
        daily_value,
      },
    });

    return vehicle;
  }
  public async findByTransmissionType(
    transmission_type: string
  ): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: {
        transmission_type,
      },
    });

    return vehicle;
  }

  public async findByName(name: string): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return vehicle;
  }

  public async listAllVehicles(): Promise<Vehicle[]> {
    const vehicles = await this.ormRepository.find();

    return vehicles;
  }

  public async listFilteredVehicles(
    filter: string,
    page: number
  ): Promise<Vehicle[]> {
    const skip = 2 * page - 2;

    if (filter !== "") {
      const vehicles = await this.ormRepository.find({
        where: [
          { fuel_type: filter },
          { brand: filter },
          { transmission_type: filter },
          { daily_value: LessThanOrEqual(Number(filter)) },
        ],
        skip,
        take: 10,
      });

      return vehicles;
    }

    const vehicles = await this.ormRepository.find({
      skip,
      take: 10,
    });
    return vehicles;
  }

  public async remove(id: string): Promise<Vehicle[]> {
    const vehicle = await this.findById(id);

    await this.ormRepository.delete({ id: vehicle?.id });

    const vehicles = await this.ormRepository.find();

    return vehicles;
  }
}
