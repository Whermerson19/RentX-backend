import { Router } from "express";

import multer from "multer";

import Authorization from "../middlewares/Authorization";

import UsersController from "../controllers/Users/UsersController";
import ChangeProfileImageController from "../controllers/Users/ChangeProfileImageController";

import uploadConfig from "../config/upload";

const usersRouter = Router();

const authorization = new Authorization();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const changeProfileImageController = new ChangeProfileImageController();

usersRouter.post("/create", usersController.create);
usersRouter.patch(
  "/change-profile-image",
  authorization.clientAuthorization,
  upload.single("image"),
  changeProfileImageController.put
);
usersRouter.put(
  "/change-profile",
  authorization.clientAuthorization,
  usersController.put
);

export default usersRouter;
