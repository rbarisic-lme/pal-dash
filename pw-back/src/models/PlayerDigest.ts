import { AttributeTypes, BaseModel, ModelConstructor } from './BaseModel.ts';
import { v4 as uuidv4 } from 'uuid';
import { Player } from './Player.ts';

export class PlayerDigest extends BaseModel {
  protected static modelName: string = 'player_digest';

  get sav(): {[key: string]: any} {
    return this.data.sav ?? {}
  } 

  public static override attributes: AttributeTypes = {
      ...Player.attributes
  };

  constructor(data: ModelConstructor = { id: null }) {
    // if(!data._id) throw new Error('Incorrectly parsed Player data to PlayerDigest:' + data?.toString(),);
    super(data);

    this.id += ':' + this.createdAt.toISOString();

    try {
      console.error(data);
      this.sav.header = {
        save_game_version: this.sav.header.save_game_version
      }
    } catch(e) {
      console.warn("couldn't remove elements from attribute 'sav' on " + this._id, e);
    }
  }
}