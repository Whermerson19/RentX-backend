import User from '../../models/User';

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  admin: boolean;
}

export default interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}