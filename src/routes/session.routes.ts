import { Router } from 'express';

import SessionsController from '../controllers/Sessions/SessionsController'

const sessionRouter = Router();

const sessionController = new SessionsController();

sessionRouter.post('/create', sessionController.create);

export default sessionRouter;