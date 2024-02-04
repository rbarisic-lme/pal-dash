// Define an interface for the common set of functions and getters
// Savegames might change in the future and thus we need a version system so the app doesn't break on older versions.
export interface PalworldSavegameParser {
  palsCaptured: any;
  // Common getters
  magic: number;
  saveGameVersion: number;
  packageFileVersionUE4: number;
  packageFileVersionUE5: number;
  engineVersionMajor: number;
  engineVersionMinor: number;
  version: number;
  timestamp: number;

  header: any;
  saveData: any;
  recordData: any;

  // Common methods
  // Add more common methods as needed
}