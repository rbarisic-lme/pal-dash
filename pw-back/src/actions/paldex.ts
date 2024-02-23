import fs from 'fs';

import express, { Router, Request, Response } from 'express';
import { SaveConverter } from '@/lib/saveConverter.ts'; // Adjust the import path based on your project structure
import pals from 'palworld-paldex-api/src/pals.json'
import { IPal } from 'palworld-paldex-api/src/common/interfaces/pal.interface.ts'

const router = express.Router();

// Todo: annotate what routes do
router.get('/', async (req: Request, res: Response) => {
  
  const playerGUUID = req.query.player;

  if(!playerGUUID) { 
    res.status(500)
    res.json({error: 'no playerGUUID query param supplied. set it with ?player=<playerGUIID>'})
  }

  const jsonResponse = {
    playerGUUID,
    message: 'Hello from Paldex!',
  };
  res.json(jsonResponse);
});


// todo: let me set which fields to return
router.get('/pals', (req: Request, res: Response) => {
  // res.json(pals.map(pal => [pal.name, pal.asset]));
  res.json(pals);
})


export default router;