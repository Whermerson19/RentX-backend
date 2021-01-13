import { Router } from "express";

import usersRouter from "./users.routes";
import sessionsRouter from "./session.routes";
import passwordRouter from "./password.routes";
import vehicleRouter from './vehicle.routes'
import rentalsRouter from './rentals.routes'

const appRouter = Router();

appRouter.use("/users", usersRouter);
appRouter.use("/sessions", sessionsRouter);
appRouter.use('/password', passwordRouter);
appRouter.use('/vehicles', vehicleRouter);
appRouter.use('/rentals', rentalsRouter);

export default appRouter;
