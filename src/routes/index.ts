import { Router } from "express";

import usersRouter from "./users.routes";
import sessionsRouter from "./session.routes";

const appRouter = Router();

appRouter.use("/users", usersRouter);
appRouter.use("/sessions", sessionsRouter);

export default appRouter;
