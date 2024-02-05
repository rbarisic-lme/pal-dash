import fs from 'fs';
import validator from 'validator';

import express, { Router, Request, Response } from 'express';
import { PalFiles } from '../lib/palFiles.ts';

const router = express.Router();

// write name to a file -- todo: let's exchange this with a DB later on
const nameFileDir = './data/';

router.get('/', async (req: Request, res: Response) => {
  const playerSaves = await PalFiles.listPlayerSavesWithEnv()

  res.json({
    status: req.statusCode,
    playerSaves,
  });
});

const sanitizeName = (name: string) => {
  return validator.escape(name.slice(0, 50)); // don't allow large strings
}

router.get('/name/:id', async (req: Request, res: Response) => {
  try {
    const filePath = nameFileDir + req.params.id;

    let pwdash__name;
    try {
      pwdash__name = fs.readFileSync(nameFileDir + save?.slice(0, -4), 'utf8');
    } catch {
      // console.log('file for ' + save?.slice(0, -4) + ' not found')
      pwdash__name = undefined;
    }

    res.json({ pwdash__name })
  } catch (error) {
    console.error(`Error reading file at ${nameFileDir}:`, error.message);
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