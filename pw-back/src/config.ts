import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const procEnv = process.env

export enum Environment {
  Production = "production",
  Staging = "staging",
  Development = "development",
}

interface ServerConfig {
  environment: Environment,
  port: number,
  rootDir: string,
  palDir: string,
  serverId: string,
  worldGuid: string,
  pythonRuntime: string,
  admin: {
    username: string,
    password: string,
  }
  appSecret: string,
  db?: {
    type: string,
  }
  couchDB?: {
    db: string, // database name
    url: string,
    cookie: string,
    user: string,
    password: string,
  }
  // Add other configurations here
}

const environmentFromEnv = procEnv.environment as Environment | undefined;
const isValidEnvironment = Object.values(Environment).includes(environmentFromEnv);

const config: ServerConfig = {
  environment: isValidEnvironment ? procEnv.environment as Environment : Environment.Development,
  port: Number(procEnv.PORT) || 3000,
  rootDir: procEnv.ROOT_DIR || '',
  palDir: procEnv.PAL_DIR || '',
  serverId: procEnv.SERVER_ID || '',
  worldGuid: procEnv.WORLD_GUID || '',
  pythonRuntime: procEnv.PYTHON_RUNTIME || 'python',
  admin: {
    username: procEnv.ADMIN_USERNAME || '',
    password: procEnv.ADMIN_PASSWORD || '',
  },
  appSecret: procEnv.APP_SECRET || '',
  // Add other configurations here
  db: {
    type: procEnv.DB_TYPE,
  },
  couchDB: {
    db: procEnv.COUCHDB_DB,
    url: procEnv.COUCHDB_URL,
    cookie: procEnv.COUCHDB_COOKIE,
    user: procEnv.COUCHDB_USER,
    password: procEnv.COUCHDB_PW,
  }
};

export const env = config

export const fullWorldPath   = path.join(config.palDir, 'Saved', 'SaveGames', config.serverId, config.worldGuid);
export const playerSavesPath = path.join(fullWorldPath, 'Players');