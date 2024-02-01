// add your new actions to 'routes.ts'
import express, { Router, Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const jsonResponse = { message: 'hello world!' };
  res.json(jsonResponse);
});

export default router;