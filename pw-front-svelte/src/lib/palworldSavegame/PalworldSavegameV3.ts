import type { PalWorldSavegame } from ".";
import { type PalworldSavegameParser } from "./PalworldSavegameParser";

// Create a JavaScript class that exposes the savegame values
export class PalWorldSavegameV3 implements PalworldSavegameParser {
  data: PalWorldSavegameV3Data;

  constructor(data: PalWorldSavegameV3Data) {
    this.data = data
  }

  // Getter methods to access savegame values
  get magic(): number {
    return this.data.header.magic;
  }

  get saveGameVersion(): number {
    return this.data.header.save_game_version;
  }

  get packageFileVersionUE4(): number {
    return this.data.header.package_file_version_ue4;
  }

  get packageFileVersionUE5(): number {
    return this.data.header.package_file_version_ue5;
  }

  get engineVersionMajor(): number {
    return this.data.header.engine_version_major;
  }

  get engineVersionMinor(): number {
    return this.data.header.engine_version_minor;
  }

  get version(): number {
    return this.data.properties.Version.value;
  }

  get timestamp(): number {
    return this.data.properties.Timestamp.value;
  }

  get header() {
    return this.data.header;
  }

  get saveData() {
    return this.data.properties.SaveData.value;
  }

  get recordData(): PalLoggedinPlayerSaveDataRecordData {
    return this.saveData.RecordData?.value ?? {};
  }

  get palsCaptured(): PalCaptureCountItem[] {
    return this.recordData?.PalCaptureCount?.value ?? [];
  }

  // todo: add getters
}