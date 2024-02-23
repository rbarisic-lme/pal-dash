import { env, fullWorldPath, playerSavesPath } from '@/config.ts';
import { execSync } from 'node:child_process';
import {execa} from 'execa';

import fs from 'fs';
import path from 'path';

export enum LevelFilename {
  Level = "Level.sav",
  LevelJSON = "Level.sav.json",
  LevelMeta = "LevelMeta.sav",
  LocalData = "LocalData.sav",
  WorldOption = "WorldOption.sav",
}

export const execaLockFilePath = path.join(fullWorldPath, 'savToJSONExeca.lock');

export class SaveConverter {

  public static playerSavToJSON(playerFilename: string, absolutePath: boolean = false) {
    // console.error('reading player SAV: ', playerFilename)
    return this.savToJSON(path.join(absolutePath ? '' : playerSavesPath, playerFilename));
  }

  // Converts a Sav to JSON from World Root Directory
  // This directory includes Level.sav, LevelMeta.sav, LocalData.sav, WorldOption.sav
  public static savToJSONWorldRoot(levelFilename: LevelFilename) {
    return this.savToJSON(path.join(fullWorldPath, levelFilename));
  }

  // // Example usage
  // const saveFilePath = 'C:\\Users\\<user>\\AppData\\Local\\Pal\\Saved\\SaveGames\\0\\F37D14B248EFAFC63FB56E8E65671166\\Players\\C9A02362000000000000000000000000.sav';
  // SaveConverter.convertSave(saveFilePath);
  public static savToJSON(saveFilePath: string) {
    const benchmarkStart = performance.now();
    const pythonScriptPath = 'vendor/palworld-convert-save/convert.py';

    const command = `${env.pythonRuntime} ${pythonScriptPath} --to-json --print-json --minify-json "${saveFilePath}"`;

    try {
      const output = execSync(command, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 1000  }); //1000mb maxBuffer
      console.log('Successfully read ' + saveFilePath + ' in ' + (performance.now() - benchmarkStart).toFixed(2) + 'ms')
      // console.log(output);

      return output;
    } catch (error: Error | any) {
      console.error(`Error executing Python script: ${error.message} after ${(performance.now() - benchmarkStart).toFixed(2)}ms`);
    }
  }

  public static async savToJSONExecaLocked(saveFilePath: string) {
    // We need to utilize a lockFile to prevent this script from ever running multiple times.
    // This could very easily kill the host server.
    if (fs.existsSync(execaLockFilePath)) {
      throw new Error('PlayerInfoExtractor is already running.');
    } else {
      fs.writeFileSync(execaLockFilePath, 'LOCK');
    }

    const benchmarkStart = performance.now();
    const pythonScriptPath = 'vendor/palworld-convert-save/convert.py';
    const command = `${env.pythonRuntime} ${pythonScriptPath} --to-json "${saveFilePath}"`;
    
    try {
      // Wait for execa to execute the command and create a Level.sav.json
      await execa(command);
    } catch(e) {
      console.error(e);
    } finally {
      // remove lockfile
      fs.unlinkSync(execaLockFilePath);
      console.log('Read Level.sav process finished in ' + (performance.now() - benchmarkStart).toFixed(2) + 'ms')
      return Promise.resolve();
    }
  }
}