import { env, playerSavesPath } from '@/config.ts';
import fs from 'fs';
import path from 'path';
import Mode, { type StatsMode } from 'stat-mode';

interface listPlayerSaveItem {
  value: string | any,
  stats: string | any,
}

export class PalFiles {
  static async listPlayerSavesWithEnv(): Promise<listPlayerSaveItem[]> {
    return this.listPlayerSaves(env.palDir, env.serverId, env.worldGuid);
  }

  static async listPlayerSaves(palDir: string, serverId: string, worldGuid: string): Promise<listPlayerSaveItem[]> {
    const saveGamesPath = path.join(palDir, 'Saved', 'SaveGames', serverId, worldGuid, 'Players');

    try {
      const playerSaves = fs.readdirSync(saveGamesPath);
      
      const returnSaves: listPlayerSaveItem[] = await Promise.all(playerSaves.map(async (save) => ({
        value: save,
        stats: await this.getFileDate(path.join(saveGamesPath, save)),
      })));

      return returnSaves;

    } catch (error: Error | any) {
      console.error(`Error listing player saves: ${error.message}`);
      return [];
    }
  }

  static async getFileDate(filePath: string) {
    try {
      const stat = await fs.promises.stat(filePath);
      // @ts-ignore typescript bug
      const mode: StatsMode = new Mode(stat);

      return mode
    } catch (error: Error | any) {
      console.error(`Error getting file stats: ${error.message}`);
      return null;
    }
  }
}
