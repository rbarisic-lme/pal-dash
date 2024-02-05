import fs from 'fs';

import express, { Router, Request, Response } from 'express';
import { SaveConverter } from '@/lib/saveConverter.ts'; // Adjust the import path based on your project structure
import pals from 'palworld-paldex-api/src/pals.json' assert { type: 'json' }
import { IPal } from 'palworld-paldex-api/src/common/interfaces/pal.interface.ts'

const router = express.Router();

const nameFileDir = './data/';

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
  // console.error(pals);
  
  // res.json(pals.map(pal => [pal.name, pal.asset]));
  res.json(pals);
})

// todo: move to players.ts
router.get('/:id', (req: Request, res: Response) => {
  const playerId = req.params.id;

  if (!playerId) {
    res.status(400).json({ error: 'Player ID is required.' });
    return;
  }

  const fileContents = SaveConverter.playerSavToJSON(playerId + '.sav')

  // console.error(fileContents)

  const dataJSON = JSON.parse(fileContents);

  console.error(dataJSON)

  const filePath = nameFileDir + req.params.id;

  // todo: this is redundant, appears 3 times in code. refactor pls
  let pwdash__name;
  try {
    pwdash__name = fs.readFileSync(nameFileDir + playerId, 'utf8');
  } catch {
    // console.log('file for ' + save?.slice(0, -4) + ' not found')
    pwdash__name = undefined;
  }

  res.json({
    pwdash__name,
    fileContents: dataJSON
  });

})


export default router;