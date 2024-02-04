// dockerComposeTypes.ts
interface PortConfiguration {
  mode: string;
  protocol: string;
  published: number;
  target: number;
}

interface EnvironmentVariables {
  [key: string]: string;
  TZ: string;
  ALWAYS_UPDATE_ON_START: string;
  MULTITHREAD_ENABLED: string;
  COMMUNITY_SERVER: string;
  BACKUP_ENABLED: string;
  BACKUP_CRON_EXPRESSION: string;
  STEAMCMD_VALIDATE_FILES: string;
  SERVER_SETTINGS_MODE: string;
  NETSERVERMAXTICKRATE: string;
  DIFFICULTY: string;
  DAYTIME_SPEEDRATE: string;
  NIGHTTIME_SPEEDRATE: string;
  EXP_RATE: string;
  PAL_CAPTURE_RATE: string;
  PAL_SPAWN_NUM_RATE: string;
  PAL_DAMAGE_RATE_ATTACK: string;
  PAL_DAMAGE_RATE_DEFENSE: string;
  PLAYER_DAMAGE_RATE_ATTACK: string;
  PLAYER_DAMAGE_RATE_DEFENSE: string;
  PLAYER_STOMACH_DECREASE_RATE: string;
  PLAYER_STAMINA_DECREACE_RATE: string;
  PLAYER_AUTO_HP_REGENE_RATE: string;
  PLAYER_AUTO_HP_REGENE_RATE_IN_SLEEP: string;
  PAL_STOMACH_DECREACE_RATE: string;
  PAL_STAMINA_DECREACE_RATE: string;
  PAL_AUTO_HP_REGENE_RATE: string;
  PAL_AUTO_HP_REGENE_RATE_IN_SLEEP: string;
  BUILD_OBJECT_DAMAGE_RATE: string;
  BUILD_OBJECT_DETERIORATION_DAMAGE_RATE: string;
  COLLECTION_DROP_RATE: string;
  COLLECTION_OBJECT_HP_RATE: string;
  COLLECTION_OBJECT_RESPAWN_SPEED_RATE: string;
  ENEMY_DROP_ITEM_RATE: string;
  DEATH_PENALTY: string;
  ENABLE_PLAYER_TO_PLAYER_DAMAGE: string;
  ENABLE_FRIENDLY_FIRE: string;
  ENABLE_INVADER_ENEMY: string;
  ACTIVE_UNKO: string;
  ENABLE_AIM_ASSIST_PAD: string;
  ENABLE_AIM_ASSIST_KEYBOARD: string;
  DROP_ITEM_MAX_NUM: string;
  DROP_ITEM_MAX_NUM_UNKO: string;
  BASE_CAMP_MAX_NUM: string;
  BASE_CAMP_WORKER_MAXNUM: string;
  DROP_ITEM_ALIVE_MAX_HOURS: string;
  AUTO_RESET_GUILD_NO_ONLINE_PLAYERS: string;
  AUTO_RESET_GUILD_TIME_NO_ONLINE_PLAYERS: string;
  GUILD_PLAYER_MAX_NUM: string;
  PAL_EGG_DEFAULT_HATCHING_TIME: string;
  WORK_SPEED_RATE: string;
  IS_MULTIPLAY: string;
  IS_PVP: string;
  CAN_PICKUP_OTHER_GUILD_DEATH_PENALTY_DROP: string;
  ENABLE_NON_LOGIN_PENALTY: string;
  ENABLE_FAST_TRAVEL: string;
  IS_START_LOCATION_SELECT_BY_MAP: string;
  EXIST_PLAYER_AFTER_LOGOUT: string;
  ENABLE_DEFENSE_OTHER_GUILD_PLAYER: string;
  COOP_PLAYER_MAX_NUM: string;
  MAX_PLAYERS: string;
  SERVER_NAME: string;
  SERVER_DESCRIPTION: string;
  ADMIN_PASSWORD: string;
  SERVER_PASSWORD: string;
  PUBLIC_PORT: string;
  PUBLIC_IP: string;
  RCON_ENABLED: string;
  RCON_PORT: string;
  REGION: string;
  USEAUTH: string;
  BAN_LIST_URL: string;
}

interface ServiceConfiguration {
  container_name: string;
  environment: EnvironmentVariables;
  image: string;
  ports: PortConfiguration[];
  restart: string;
  volumes: string[];
}

type KnownServiceName = 'palworld-dedicated-server';
type DynamicServiceName = string;

interface Services {
  [serviceName: KnownServiceName | DynamicServiceName]: ServiceConfiguration;
}

interface DockerCompose {
  version: string;
  services: Services;
}

interface DockerStatus {
  ID: string,
  CreatedAt: string,
  Image: string,
  Names: string,
  State: string,
  Status: string,
  RunningFor: string,
}

export type {
  PortConfiguration,
  ServiceConfiguration,
  KnownServiceName,
  DynamicServiceName,
  Services,
  DockerCompose,
  DockerStatus,
};