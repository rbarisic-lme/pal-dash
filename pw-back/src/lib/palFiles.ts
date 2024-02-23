import { env, playerSavesPath } from '@/config.ts';
import fs from 'fs';
import path from 'path';
import Mode, { type StatsMode } from 'stat-mode';

interface listPlayerSaveItem {
  value: string | any,
  stats: string | any,
}

// write name to a file -- todo: let's exchange this with a DB later on
const nameFileDir = './data/';

export const getFileDate = async (filePath: string) =>  {
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

export class PalFiles {
  static async listPlayerSavesWithEnv(): Promise<listPlayerSaveItem[]> {
    return this.listPlayerSaves(env.palDir, env.serverId, env.worldGuid);
  }

  // deprecated
  static async listPlayerSaves(palDir: string, serverId: string, worldGuid: string): Promise<listPlayerSaveItem[]> {
    const saveGamesPath = path.join(palDir, 'Saved', 'SaveGames', serverId, worldGuid, 'Players');

    try {
      const playerSaves = fs.readdirSync(saveGamesPath);
      
      const returnSaves: listPlayerSaveItem[] = await Promise.all(playerSaves.map(async (save) => {
        let pwdash__name;
        try {
          pwdash__name = fs.readFileSync(nameFileDir + save?.slice(0, -4), 'utf8');
        } catch {
          // console.log('file for ' + save?.slice(0, -4) + ' not found')
          pwdash__name = undefined;
        }

        return {
          pwdash__name, 
          value: save,
          stats: await this.getFileDate(path.join(saveGamesPath, save)),
        }
      }));

      return returnSaves;

    } catch (error: Error | any) {
      console.error(`Error listing player saves: ${error.message}`);
      return [];
    }
  }

  // deprecated, use export method above
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
