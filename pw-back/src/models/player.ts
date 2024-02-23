import { AttributeTypes, BaseModel, ModelConstructor } from './BaseModel.ts';
import { v4 as uuidv4 } from 'uuid';

// todo: use shared types
// import { PalWorldSavegameV3 } from '@/../../pw-front-svelte/src/lib/palworldSavegame/PalworldSavegameV3.ts'

export class Player extends BaseModel {
  protected static modelName: string = 'player';

  public static override attributes: AttributeTypes = {
    id: String,
    name: [String, null],
    registeredAt: Date,
    sav: {},
  };


  // public sav: PalWorldSavegameV3 = {}
  get sav(): {[key: string]: any} {
    return this.data.sav ?? {}
  }

  get name(): string | any {
    return this.data.name
  }

  constructor(data: ModelConstructor = { id: null }) {
    // if(!data._id) throw new Error('Incorrectly parsed Player data:' + data?.toString(),);
    super(data)

    if(data.registeredAt) this.data.registeredAt = new Date(data.registeredAt);
  }
}