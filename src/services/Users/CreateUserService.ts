import User from '../../models/User';

import UsersRepository from '../../repositories/Users/UsersRepository';

import { hash } from 'bcryptjs'

interface IRequest {
  username: string;
  email: string;
  password: string;
  admin: boolean;
}

export default class CreateUserService {
  public async run({ username, email, password, admin }: IRequest): Promise<User> {
  
    const usersRepository = new UsersRepository();

    const checkedUserEmail = await usersRepository.findByEmail(email);

    if(checkedUserEmail) throw new Error("This email is already in use");

    const hashedPassword = await hash(password, 10);

    const user = await usersRepository.create({
      username,
      email,
      password: hashedPassword,
      admin
    });

    return user

  }
}