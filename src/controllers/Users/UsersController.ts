import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreateUserService from "../../services/Users/CreateUserService";

export default class UserControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createUser = new CreateUserService();

      const { username, email, password, admin } = request.body;

      const user = await createUser.run({
        username,
        email,
        password,
        admin,
      });

      return response.status(200).json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
