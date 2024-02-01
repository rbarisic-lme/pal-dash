import express, { Router, Request, Response } from 'express';
import { SaveConverter } from '@/lib/saveConverter.ts'; // Adjust the import path based on your project structure

const router = express.Router();

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

router.get('/:id', (req: Request, res: Response) => {
  const playerId = req.params.id;

  if (!playerId) {
    res.status(400).json({ error: 'Player ID is required.' });
    return;
  }

  const fileContents = SaveConverter.convertSaveWithEnv(playerId + '.sav')

  res.json({fileContents});

})

export default router;