import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import ChangeProfileImageService from "../../services/Users/ChangeProfileImageService";

export default class ChangeProfileImageController {
  public async put(request: Request, response: Response): Promise<Response> {
    try {
      const changeProfileImage = new ChangeProfileImageService();

      const { id } = request.user;
      const image = request.file.filename;

      const changedUser = await changeProfileImage.run({
        id,
        image,
      });

      return response.status(200).json(classToClass(changedUser));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
