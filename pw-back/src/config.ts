import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const procEnv = process.env

interface ServerConfig {
  port: number,
  palDir: string,
  serverId: string,
  worldGuid: string,
  // Add other configurations here
}

const config: ServerConfig = {
  port: Number(procEnv.PORT) || 3000,
  palDir: procEnv.PAL_DIR || '',
  serverId: procEnv.SERVER_ID || '',
  worldGuid: procEnv.WORLD_GUID || '',
  // Add other configurations here
};

export const env = config

export const fullWorldPath = path.join(config.palDir, 'Saved', 'SaveGames', config.serverId, config.worldGuid);
export const playerSavesPath = path.join(fullWorldPath, 'Players');