import express, { Router, Request, Response } from 'express';
import { PalFiles } from '../lib/palFiles.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const playerSaves = await PalFiles.listPlayerSavesWithEnv()

  res.json({
    status: req.statusCode,
    playerSaves,
  });
});

export default router;