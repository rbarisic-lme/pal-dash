import express, { Router, Request, Response } from 'express';
import { SaveConverter } from '@/lib/saveConverter.ts'; // Adjust the import path based on your project structure
import pals from 'palworld-paldex-api/src/pals.json' assert { type: 'json' }
import { IPal } from 'palworld-paldex-api/src/common/interfaces/pal.interface.ts'

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


router.get('/pals', (req: Request, res: Response) => {
  console.error(pals);
  
  res.json(pals.map(pal => [pal.name, pal.asset]));
})

// todo: move to players.ts
router.get('/:id', (req: Request, res: Response) => {
  const playerId = req.params.id;

  if (!playerId) {
    res.status(400).json({ error: 'Player ID is required.' });
    return;
  }

  const fileContents = SaveConverter.playerSavToJSON(playerId + '.sav')

  res.json({fileContents});

})


export default router;