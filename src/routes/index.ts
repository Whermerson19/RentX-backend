import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', (request, response) => {
  const { name } = request.body;

  return response.json({ name: name })
})

export default appRouter;