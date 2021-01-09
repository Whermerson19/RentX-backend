import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreateSessionService from "../../services/Sessions/CreateSessionService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createSession = new CreateSessionService();

      const { email, password } = request.body;

      const data = await createSession.run({
        email,
        password,
      });

      return response.status(200).json(classToClass(data));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
