import type { PalworldSavegameParser } from "./PalworldSavegameParser";
import { PalWorldSavegameV3 } from "./PalworldSavegameV3";

export class PalWorldSavegame {
  public parser: PalworldSavegameParser;

  constructor(fileContents: string) {
    if(!fileContents) throw new Error('fileContents not defined or undefined')
    
    const data = JSON.parse(fileContents);

    // Determine the save game version
    const saveGameVersion = data.header.save_game_version;
    
    // Choose the appropriate version class based on the save game version
    switch (saveGameVersion) {
      case 3:
        this.parser = new PalWorldSavegameV3(data);
        break;
      // todo: Add cases for other save game versions as needed
      // ...

      default:
        try {
          this.parser = new PalWorldSavegameV3(data); // use a fallback 
        } catch {
          throw new Error(`Unsupported save game version: ${saveGameVersion}`);
        }
        break;
    }
  }

  // Delegate getter methods to the version class
  get saveGameVersion() {
    return this.parser.saveGameVersion
  }

  get header() {
    return this.parser.header;
  }

  get saveData() {
    return this.parser.saveData;
  }

  get recordData(): PalLoggedinPlayerSaveDataRecordData {
    return this.parser.recordData.value;
  }

  get palsCaptured() {
    return this.parser.palsCaptured;
  }

  // get packageFileVersionUE4() {
  //   return this.parser.packageFileVersionUE4
  // }

  // get packageFileVersionUE5() {
  //   return this.parser.packageFileVersionUE5
  // }

  // get engineVersionMajor() {
  //   return this.parser.engineVersionMajor
  // }

  // get engineVersionMinor() {
  //   return this.parser.engineVersionMinor
  // }

  // todo: Add more delegate methods for other properties based on the savegame structure
  public toString() {
    'i am here'
  }
}
