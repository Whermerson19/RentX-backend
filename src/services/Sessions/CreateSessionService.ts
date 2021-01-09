import User from '../../models/User'

import UsersRepository from '../../repositories/Users/UsersRepository'

import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import authConfig from '../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async run({ email, password }: IRequest): Promise<IResponse> {

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(email);
    if(!user) throw new Error("invalid email or password");

    const checkedPassword = await compare(password, user.password);
    if(!checkedPassword) throw new Error('Invalid email or password');

    const token = sign({ admin: user.admin }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token
    }

  }
}