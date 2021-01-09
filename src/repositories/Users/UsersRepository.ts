import { getRepository, Repository } from "typeorm";
import User from "../../models/User";

import IUsersRepository from "./IUsersRepository";
import { ICreateUser } from "./IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    username,
    email,
    password,
    admin,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      username,
      email,
      password,
      admin,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}
