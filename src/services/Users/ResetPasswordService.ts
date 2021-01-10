import { hash } from "bcryptjs";
import { getRepository } from "typeorm";

import User from "../../models/User";
import UsersToken from "../../models/UsersToken";

import UsersRepository from "../../repositories/Users/UsersRepository";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async run({ token, password }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const tokenRepository = getRepository(UsersToken);

    const userToken = await tokenRepository.findOne({
      where: {
        token,
      },
    });

    if (!userToken) throw new Error("Token does not exists");

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) throw new Error("Invalid user");

    const createdAtToken = userToken.created_at;

    if (new Date(Date.now()).getHours() - createdAtToken.getHours() > 2)
      throw new Error("Token expired");

    user.password = await hash(password, 10);

    await usersRepository.save(user)

    return user;
  }
}
