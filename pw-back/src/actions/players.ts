import fs from 'fs';
import validator from 'validator';

import express, { Router, Request, Response } from 'express';
import { PalFiles } from '../lib/palFiles.ts';
import { Player } from '@/models/Player.ts';

const router = express.Router();

// write name to a file -- todo: let's exchange this with a DB later on
const nameFileDir = './data/';

router.get('/', async (req: Request, res: Response) => {
  // const playerSaves = await PalFiles.listPlayerSavesWithEnv()
  const players = await Player.findAll({
    fields: [
      'id',
      'name',
      'registeredAt',
    ]
  });

  res.json({
    status: req.statusCode,
    players,
    // playerSaves,
  });
});

const sanitizeName = (name: string) => {
  return validator.escape(name.slice(0, 50)); // don't allow large strings
}

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const player = await Player.find(req.params.id);
    
    if (!req.params.id) {
      res.status(400).json({ error: 'Player ID is required.' });
      return;
    }

    res.json({ player })
  } catch (error) {
    console.error(`Error getting players/:id:`, error);
    return null;
  }
})

router.post('/name', async (req: Request, res: Response) => {
  try {
    console.log('incoming POST request to players/name, body:', req.body);
    const data = req.body;

    const filePath = nameFileDir + data.id;

    // Write to the file
    fs.writeFile(filePath, sanitizeName(data.name), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log(`Name ${data.name} for Player ${data.id} has been written to ${filePath}`);
      }
    });

  } catch(e) {
    console.error(e);
    res.status(500);
  }
})

export default router;