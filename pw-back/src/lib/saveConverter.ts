import { env, fullWorldPath, playerSavesPath } from '@/config.ts';
import { execSync } from 'node:child_process';
import path from 'path';

export enum LevelFilename {
  Level = "Level.sav",
  LevelMeta = "LevelMeta.sav",
  LocalData = "LocalData.sav",
  WorldOption = "WorldOption.sav",
}

export class SaveConverter {

  public static playerSavToJSON(playerFilename: string) {
    return this.savToJSON(path.join(playerSavesPath, playerFilename));
  }

  // Converts a Sav to JSON from World Root Directory
  // This directory includes Level.sav, LevelMeta.sav, LocalData.sav, WorldOption.sav
  public static savToJSONWorldRoot(levelFilename: LevelFilename) {
    return this.savToJSON(path.join(fullWorldPath, levelFilename));
  }

  // // Example usage
  // const saveFilePath = 'C:\\Users\\xiq\\AppData\\Local\\Pal\\Saved\\SaveGames\\76561198898552785\\F37D14B248EFAFC63FB56E8E65671166\\Players\\C9A02362000000000000000000000000.sav';
  // SaveConverter.convertSave(saveFilePath);
  public static savToJSON(saveFilePath: string) {
    const benchmarkStart = performance.now();
    const pythonScriptPath = 'vendor/palworld-convert-save/convert.py';

    const command = `${env.pythonRuntime} ${pythonScriptPath} --to-json --print-json --minify-json ${saveFilePath}`;

    try {
      const output = execSync(command, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 1000  }); //1000mb maxBuffer
      console.log('Successfully read ' + saveFilePath + ' in ' + (performance.now() - benchmarkStart).toFixed(2) + 'ms')
      // console.log(output);

      return output;
    } catch (error: Error | any) {
      console.error(`Error executing Python script: ${error.message} after ${(performance.now() - benchmarkStart).toFixed(2)}ms`);
    }
  }
}