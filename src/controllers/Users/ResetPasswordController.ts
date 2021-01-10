import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import ResetPasswordService from "../../services/Users/ResetPasswordService";

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const resetPassword = new ResetPasswordService();

      const { password } = request.body;
      const { token } = request.params;

      const changedUser = await resetPassword.run({
        password,
        token,
      });

      return response.status(200).json(classToClass(changedUser));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
