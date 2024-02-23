import { env } from '@/config.ts';

import { CouchdbAdapter } from './adapters/couchdb.ts';
import { FirebaseAdapter } from './adapters/firebase.ts';

export interface DatabaseAdapter {
  // Create
  create(data: any): Promise<any>;

  // Find by anything
  findBy(query: Record<string, any>, fields?: any[]): Promise<any[]>;
  
  // Find by _id with a prefix, example: findByPrefix("player")
  // Where _id is: "player:123123123123123"
  findByPrefix(arg0: string, fields?: any[]): Promise<any[]>;

  // Read
  read(id: string): Promise<any>;
  readAll(): Promise<any[]>;

  // Update
  update(id: string, data: any): Promise<any>;

  // Delete
  delete(id: string): Promise<any>;

  // Insert
  insert(data: any): Promise<any>;

  // Upsert
  upsert(id: string, data: any): Promise<any>;
}

const dbType = env.db.type;

let db: DatabaseAdapter;

if (dbType === 'couchdb') {
  db = new CouchdbAdapter();
} else if (dbType === 'firebase') {
  db = new FirebaseAdapter();
} else {
  throw new Error('DB_TYPE not set in .env or not compatible.')
}

export { db }