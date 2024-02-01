import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes.ts';

// Init .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Middleware to set Content-Type to application/json for all responses
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

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