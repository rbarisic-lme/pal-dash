import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { SaveConverter, LevelFilename } from '@/lib/saveConverter.ts';
import { fullWorldPath } from '@/config.ts';

export class PlayerInfoExtractor {
  playerUid: string;

  constructor(playerUid: string) {
    this.playerUid = playerUid;
  }

  async createLevelSavJSON() {
    // Successfully Reading the Level.sav with this method should create a Level.sav.json that we can traverse
    const levelSavJson = await SaveConverter.savToJSONExecaLocked(path.join(fullWorldPath, LevelFilename.Level));
    return Promise.resolve();
  }

  static async extractPlayerInfo(playerUid): Promise<string | any> {
    const groupNameRegex = new RegExp(`group_name.+${playerUid}`);
    const playerNameRegex = /player_name.*?".*?"(.+).*?"/;

    return new Promise((resolve, reject) => {
      try {
        // For now, return if file doesn't exist
        const levelSavJsonExists = fs.existsSync(path.join(fullWorldPath, 'Level.sav.json'));
        
        if(!levelSavJsonExists) return reject('Level.sav.json not found');

        // Read Level.sav.json file line by line and extract player info
        const readStream = fs.createReadStream(path.join(fullWorldPath, 'Level.sav.json'));

        const rl = readline.createInterface({
          input: readStream,
          crlfDelay: Infinity,
        });
  
        let isInPlayerSection = false;
        let playerName = '';

        rl.on('line', (line) => {
          if (groupNameRegex.test(line)) {
            console.log(`found group regex: ${line?.trim()}`);
            isInPlayerSection = true;
          }
  
          if (isInPlayerSection) {
            const match = line.match(playerNameRegex);
            if (match) {
              // extract player name from Level.sav.json and stop operation
              playerName = match[1];
              console.log(`found player name in Level.sav: ${playerName}`);

              // Close the stream after finding the player name
              rl.close();
            }
          }
        });
  
        rl.on('close', () => {
          if(playerName) {
            return resolve(playerName);
          } else {
            return reject('player name not found for ' + playerUid);
          }
        });
      } catch (error) {
        console.error('Error reading Level.sav.json:', error.message);
        reject(error);
      }
    });
  }
}