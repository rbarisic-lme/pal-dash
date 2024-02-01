import { env, playerSavesPath } from '@/config.ts';
import { execSync } from 'node:child_process';
import path from 'path';

export class SaveConverter {

  public static convertSaveWithEnv(playerFilename: string) {
    return this.convertSave(path.join(playerSavesPath, playerFilename));
  }

  // // Example usage
  // const saveFilePath = 'C:\\Users\\xiq\\AppData\\Local\\Pal\\Saved\\SaveGames\\76561198898552785\\F37D14B248EFAFC63FB56E8E65671166\\Players\\C9A02362000000000000000000000000.sav';
  // SaveConverter.convertSave(saveFilePath);
  public static convertSave(saveFilePath: string) {
    const pythonScriptPath = 'vendor/palworld-convert-save/convert.py';

    const command = `${env.pythonRuntime} ${pythonScriptPath} --to-json --print-json --minify-json ${saveFilePath}`;

    try {
      const output = execSync(command, { encoding: 'utf-8' });
      console.log(output);

      return output;
    } catch (error: Error | any) {
      console.error(`Error executing Python script: ${error.message}`);
    }
  }
}