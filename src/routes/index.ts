import { Router } from "express";

import usersRouter from "./users.routes";
import sessionsRouter from "./session.routes";
import passwordRouter from "./password.routes";

const appRouter = Router();

appRouter.use("/users", usersRouter);
appRouter.use("/sessions", sessionsRouter);
appRouter.use('/password', passwordRouter);

export default appRouter;
