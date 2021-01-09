import { Router } from 'express';

import UsersController from '../controllers/Users/UsersController'

const usersRouter = Router();

const usersController = new UsersController()

usersRouter.post('/create', usersController.create);

export default usersRouter;