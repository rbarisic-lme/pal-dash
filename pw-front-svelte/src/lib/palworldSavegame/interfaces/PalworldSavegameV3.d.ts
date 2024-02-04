interface PalWorldSavegameV3Data {
  header: {
    custom_version_format: number;
    custom_versions: Array<[string, number]>;
    engine_version_branch: string;
    engine_version_changelist: number;
    engine_version_major: number;
    engine_version_minor: number;
    engine_version_patch: number;
    magic: number;
    package_file_version_ue4: number;
    package_file_version_ue5: number;
    save_game_class_name: string;
    save_game_version: number;
  };
  properties: {
    Version: Version;
    Timestamp: Timestamp;
    SaveData: {
      id: null;
      struct_id: string;
      struct_type: string;
      type: string;
      value: {
        IndividualId: PalInstanceID;
        LastTransform: PalTransform;
        OtomoCharacterContainerId: PalContainerId;
        PalStorageContainerId: PalContainerId;
        PlayerCharacterMakeData: PalPlayerDataCharacterMakeInfo;
        PlayerUId: PalInstanceID;
        RecordData: PalLoggedinPlayerSaveDataRecordData;
        TechnologyPoint: {
          id: null;
          type: string;
          value: number;
        };
        UnlockedRecipeTechnologyNames: Array<string>;
        bossTechnologyPoint: {
          id: null;
          type: string;
          value: number;
        };
        inventoryInfo: PalPlayerDataInventoryInfo;
        Timestamp: {
          id: null;
          struct_id: string;
          struct_type: string;
          type: string;
          value: number;
        };
        Version: {
          id: null;
          type: string;
          value: number;
        };
      };
    };
  };
  trailer: string;
}

interface PalInstanceID {
  id: null;
  struct_id: string;
  struct_type: string;
  type: string;
  value: string;
}

interface PalContainerId {
  id: null;
  struct_id: string;
  struct_type: string;
  type: string;
  value: string;
}

interface PalTransform {
  id: null;
  struct_id: string;
  struct_type: string;
  type: string;
  value: {
    Rotation: {
      id: null;
      struct_id: string;
      struct_type: string;
      type: string;
      value: {
        w: number;
        x: number;
        y: number;
        z: number;
      };
    };
    Translation: {
      id: null;
      struct_id: string;
      struct_type: string;
      type: string;
      value: {
        x: number;
        y: number;
        z: number;
      };
    };
  };
}

interface PalLinearColor {
  id: null;
  struct_id: string;
  struct_type: string;
  type: string;
  value: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

interface PalPlayerDataCharacterMakeInfo {
  ArmVolume: {
    id: null;
    type: string;
    value: number;
  };
  BodyColor: PalLinearColor;
  BodyMeshName: {
    id: null;
    type: string;
    value: string;
  };
  BodySubsurfaceColor: PalLinearColor;
  BrowColor: PalLinearColor;
  EyeColor: PalLinearColor;
  EyeMaterialName: {
    id: null;
    type: string;
    value: string;
  };
  HairColor: PalLinearColor;
  HairMeshName: {
    id: null;
    type: string;
    value: string;
  };
  HeadMeshName: {
    id: null;
    type: string;
    value: string;
  };
  LegVolume: {
    id: null;
    type: string;
    value: number;
  };
  TorsoVolume: {
    id: null;
    type: string;
    value: number;
  };
  VoiceID: {
    id: null;
    type: string;
    value: number;
  };
}

interface PalLoggedinPlayerSaveDataRecordData {
  FastTravelPointUnlockFlag: Map<string, boolean>;
  NormalBossDefeatFlag: Map<string, boolean>;
  NoteObtainForInstanceFlag: Map<string, boolean>;
  PalCaptureCount: Map<string, number>;
  PalCaptureCountBonusCount_Tier1: {
    id: null;
    type: string;
    value: number;
  };
  PalCaptureCountBonusCount_Tier3: {
    id: null;
    type: string;
    value: number;
  };
  PaldeckUnlockFlag: Map<string, boolean>;
  RelicObtainForInstanceFlag: Map<string, boolean>;
  RelicPossessNum: {
    id: null;
    type: string;
    value: number;
  };
  TowerBossDefeatFlag: Map<string, boolean>;
  TribeCaptureCount: {
    id: null;
    type: string;
    value: number;
  };
  TechnologyPoint: {
    id: null;
    type: string;
    value: number;
  };
  UnlockedRecipeTechnologyNames: Array<string>;
  bossTechnologyPoint: {
    id: null;
    type: string;
    value: number;
  };
}

interface Version {
  id: any
  value: number
  type: string
}

interface Timestamp {
  struct_type: string
  struct_id: string
  id: any
  value: number
  type: string
}

interface PalPlayerDataInventoryInfo {
  CommonContainerId: PalContainerId;
  DropSlotContainerId: PalContainerId;
  EssentialContainerId: PalContainerId;
  WeaponLoadOutContainerId: PalContainerId;
  PlayerEquipArmorContainerId: PalContainerId;
}