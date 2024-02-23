import { db } from '@/lib/db/index.ts';
import { v4 as uuidv4 } from 'uuid';

export type ModelConstructor = {
  id: string;
  [key: string]: any;
};

export type AttributeTypes = {
  [key: string]: any;
};

export class BaseModel {
  // Index signature to allow dynamic property access
  [key: string]: any;

  protected static modelName: string = 'baseModel';

  // A List of permitted Attributes for Database transfer
  protected static attributes: AttributeTypes = {
    _id: String,
    createdAt: String,
  };

  public id: string;
  public createdAt: Date = new Date();

  public get _id() : string {
    return this.id
  }
  public set _id(v : string) {
    this.id = v;
  }

  // Only get the Uuid part of the ID 
  public getUuid() {
    return this.id.split(':')[1];
  }

  public data: any;

  constructor(data: ModelConstructor = { id: uuidv4() }) {
    const modelName = (this.constructor as any).modelName as string;

    this.data = data;

    if(!data.id && data._id) {
      this.id = data._id
    } else if (!data._id && data.id) {
      this.id = data.id
    }

    // Ensure the provided id follows the format "baseModel:uuid"
    if (!this.id || !this.id.startsWith(`${modelName}:`)) {
      this.id = `${modelName}:${data.id || data._id || uuidv4()}`;
    }
  }

  protected transformDbData() {
    const attributes = {...BaseModel.attributes, ...(this.constructor as any).attributes};
    const modelName = (this.constructor as any).modelName;
    
    const saveData = {
      _id: this.id,
      createdAt: this.createdAt,
      ...this.data
    }

    // Filter permitted attributes
    // For now, don't bother about type checks for agility's sake
    // Typechecks would be done with dataValue and Object.entries()
    const sanitizedSaveData = Object.fromEntries(
      Object.entries(saveData)
      .filter(([dataName, dataValue]) => {
        const attrPermitted = Object.keys(attributes).includes(dataName);

        if (!attrPermitted) console.warn(`Omitted unpermitted parameter ${dataName} for Entity ${this.id}`)
        return attrPermitted;
      })
    )
      
    return sanitizedSaveData;
  }

  public serialize() {
    return JSON.stringify(this);
  }

  public async save() {    
    return db.insert(this.transformDbData());
  }

  public async upsert() {    
    return db.upsert(this.id, this.transformDbData());
  }

  public static async create(data: ModelConstructor = { id: uuidv4() }) {
    const newModel = new this(data);
    await newModel.save();
    return newModel;
  }

  // @fields: optional db fields
  public static async findAll(opts: { fields?: any[] } = { }) {
    const { fields } = opts;

    const dbEntities = await db.findByPrefix(`${this.modelName}:`, fields ? ['id', ...fields] : Object.keys(this.attributes));
    // console.log("finding all them entities", dbEntities[0])
    return dbEntities.map((item) => new this(item));
  }

  // Finds Entity by id
  public static async find(id: string) {
    const dbEntities = await db.findByPrefix(`${this.modelName}:${id}`);
    const dbEntity = dbEntities?.[0];

    if (dbEntity) {
      return new this(dbEntity as unknown as ModelConstructor);
    } else {
      throw new Error(`Couldn't find ${this.modelName} with id ${id}`);
    }
  }
}