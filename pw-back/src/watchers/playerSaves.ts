import fs from 'fs';
import path from 'path';
import { playerSavesPath } from '@/config.ts';
import { db } from '@/lib/db/index.ts';
import { SaveConverter } from '@/lib/saveConverter.ts';
import { Player } from '@/models/Player.ts';
import { BaseModel } from '@/models/BaseModel.ts';
import { PlayerInfoExtractor } from '@/lib/playerInfoExtractor.ts';
import { getFileDate } from '@/lib/palFiles';

const processPlayerSave = async (filename: string) => {
  console.log(`Processing player save: ${filename}`);
  let extractedPlayerName: string | undefined;
  
  // Remove '.sav' extension if the filename ends with '.sav'
  const processedFilename = filename.endsWith('.sav')
    ? path.basename(filename, '.sav')
    : filename;

  // todo: move this somewhere else
  // todo: disable extraction on every startup, use watch on new player or timed watch instead
  try {
    // console.info("STEP 1 for " + processedFilename);
    const extractor = new PlayerInfoExtractor(processedFilename);
    // console.info("STEP 2");
    await extractor.createLevelSavJSON();
    // console.info("STEP 3 " + processedFilename);
    extractedPlayerName = await PlayerInfoExtractor.extractPlayerInfo(processedFilename);
  } catch(e) {
    console.error("Failed to extract data", e);
  }

  // Logic to handle a player save, e.g., create entries in the database
  const fileContents = SaveConverter.playerSavToJSON(filename);
  const fileStats = await getFileDate(path.join(playerSavesPath, filename))

  // @ts-ignore stat definition is wonky
  const registeredAt = fileStats?.stat?.birthtimeMs || fileStats?.stat?.mtimeMs || fileStats?.stat?.ctimeMs

  const dataJSON = JSON.parse(fileContents);

  const player = new Player({
    id: processedFilename,
    sav: dataJSON,
    registeredAt,
    name: extractedPlayerName,
  });

  await player.upsert();
};

const processExistingPlayers = async () => {
  // Get a list of all players already in the DB
  const playersFromDB = await Player.findAll();

  // Get a list of all files in the playerSavesPath directory
  const filesInDirectory = fs.readdirSync(playerSavesPath);

  // Iterate over files and process only if the player is not in the database
  for await (const filename of filesInDirectory) {
    const playerId = path.basename(filename, '.sav');

    // Check if the player is not already in the database
    if (!playersFromDB.some((player) => player._id === playerId)) {
      const fullPath = path.join(filename);
      
      await processPlayerSave(fullPath);
    }
  }
}

export const startPlayerSavesWatcher = async () => {
  // process the existing entities on startup
  await processExistingPlayers();

  const fileQueue = [];
  let isProcessing = false;

  // start the actual watcher
  fs.watch(playerSavesPath, async (eventType, filename) => {
    if (eventType === 'change' && filename) {
      const fullPath = path.join(playerSavesPath, filename);
  
      try {
        // Check if the file exists before processing it
        await fs.promises.access(fullPath, fs.constants.F_OK);
        fileQueue.push(filename);
  
        // Process the queue if not already processing
        if (!isProcessing) {
          isProcessing = true;
          while (fileQueue.length > 0) {
            const nextFile = fileQueue.shift();
            await processPlayerSave(nextFile);
          }
          isProcessing = false;
        }
      } catch (err) {
        console.error(`Error accessing file: ${err}`);
      }
    }
  });

  console.log(`File watcher started for ${playerSavesPath}`);
};