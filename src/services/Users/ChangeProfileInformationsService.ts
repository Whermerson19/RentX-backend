import User from "../../models/User";

import UsersRepository from "../../repositories/Users/UsersRepository";

import { hash, compare } from "bcryptjs";

interface IRequest {
  id: string;
  username: string;
  email: string;

  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

export default class ChangeProfileInformationService {
  public async run({
    id,
    username,
    email,
    current_password,
    new_password,
    confirm_password,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);
    if (!user) throw new Error("Invalid user");

    const checkedEmail = await usersRepository.findByEmail(email);
    if (checkedEmail && email !== user.email)
      throw new Error("This email is already in use");

    user.username = username;
    user.email = email;

    if (current_password) {
      if (new_password) {
        if (confirm_password) {
          const comparePassword = await compare(
            current_password,
            user.password
          );
          if (comparePassword) {
            if (confirm_password === new_password) {
              const hashedPassword = await hash(new_password, 10);
              user.password = hashedPassword;
            } else {
              throw new Error("Password does not match");
            }
          }
        } else {
          throw new Error("Please confirm your new password");
        }
      } else {
        throw new Error("Please inform your new password");
      }
    }

    return await usersRepository.save(user);
  }
}
