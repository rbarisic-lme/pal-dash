import fs from 'fs';

import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';

import { initializeAuth } from './boot/passport-init.ts';

import { initializeScheduler } from './boot/bree-init.ts';

import routes from './routes.ts';
import { env } from './config.ts';
import { startPlayerSavesWatcher } from './watchers/playerSaves.ts';
import { execaLockFilePath } from './lib/saveConverter.ts';
// import { Player } from './models/Player.ts';
// import { BaseModel } from './models/BaseModel.ts';
// import { PlayerInfoExtractor } from './lib/playerInfoExtractor.ts';
// import createPlayerDigests from './jobs/createPlayerDigests.ts';

try {
  fs.unlinkSync(execaLockFilePath);
} catch(e) {
  console.info('Execa not locked, moving on.')
}

// Init .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

startPlayerSavesWatcher();

// CORS middleware
app.use(cors());

// Middleware to set Content-Type to application/json for all responses
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Middleware to parse JSON requests and urlencoded data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Setup express-session middleware
app.use(session({
  secret: env.appSecret, // Change this to a secure secret key
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
initializeAuth(app);
initializeScheduler();

// Use the imported routes
Object.entries(routes).forEach(([path, route]) => {
  app.use(path, route);
});

app.listen(port, () => {
  const serverUrl = `http://localhost:${port}`;
  const asciiArt = `
  __________        .__  ________                .__     
  \\______   \\_____  |  | \\______ \\ _____    _____|  |__                   v0.0.1
   |     ___/\\__  \\ |  |  |    |  \\\\__  \\  /  ___/  |  \\ 
   |    |     / __ \\|  |__|    \`   \\/ __ \\_\\___ \\|   Y  \\
   |____|    (____  /____/_______  (____  /____  >___|  /
                  \\/             \\/     \\/     \\/     \\/             ~ by xrlabs
  `;
  
  console.log(asciiArt);
  console.log('--------------------------------------------------------------------------------');
  console.log(`🚀 Palworld Dashboard listening on port ${port}`);
  console.log(`🌐 Server URL: ${serverUrl}`);
  console.log('--------------------------------------------------------------------------------');
});

// createPlayerDigests()