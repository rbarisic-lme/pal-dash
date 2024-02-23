import { Player } from '../models/Player.ts';
import { PlayerDigest } from '../models/PlayerDigest.ts';

export default async () => {
  console.info(`[${new Date().toLocaleString()}] Started playerDigest Job`);

  const players = await Player.findAll();

  for (const player of players) {
    try {
      const a = PlayerDigest.create({
        id: player.getUuid(),
        ...player.data
      });
    } catch (e) {
      console.error(e);
    }
  }
}