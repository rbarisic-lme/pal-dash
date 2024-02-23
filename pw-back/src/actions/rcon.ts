import express, { Router, Request, Response } from 'express';
import { execSync } from 'node:child_process';
import { csvToJSON } from '@/lib/CSVParser.ts';
import passport from 'passport';

type showAllPlayerEntity = {
  name: string;
  playeruid: string;
  steamid: string;
}

const router = express.Router();

// router.get('/showplayers', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
  router.get('/showplayers', (req: Request, res: Response) => {

  const containerName = 'palworld-dedicated-server';
  const commandToRun = 'rcon "ShowPlayers"';

  const dockerCommand = `docker exec ${containerName} ${commandToRun}`;

  try {
    const output = execSync(dockerCommand, { shell: 'bash', encoding: 'utf-8', maxBuffer: 1024 * 1024 * 0.5  }); //1mb maxBuffer
    const outputJSON = csvToJSON(output)

    if(outputJSON.players) {
      return outputJSON.players = outputJSON.players.map(player => ({
        name: player.name,
      }))
    } 

    res.json({players: outputJSON});
  } catch(e) {
    console.error(`Error executing command: ${e.message}`);
    res.status(500);
    res.json(e)

  }
});

export default router;