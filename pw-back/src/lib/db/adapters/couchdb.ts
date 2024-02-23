import { env } from "@/config.ts";
import { DatabaseAdapter } from "../index.ts";
import nano, { DocumentDestroyResponse, DocumentInsertResponse } from 'nano';

interface DataDocument {
  _id?: string;
  _rev?: string;
  // Add other properties as needed
}

const dbName = env.couchDB.db;

// Implementation for CouchDB
// Using nano (https://github.com/apache/couchdb-nano)
export class CouchdbAdapter implements DatabaseAdapter {
  private db: nano.DocumentScope<DataDocument>;

  constructor() {
    this.db = nano(`http://${env.couchDB.user}:${env.couchDB.password}@${env.couchDB.url}`).use<DataDocument>(dbName);
  }

  async create(data: DataDocument): Promise<DocumentInsertResponse> {
    const result = await this.db.insert(data);
    return result;
  }

  async findBy(query: Record<string, any>, fields: any[] = []): Promise<DataDocument[]> {
    try {
      const result = await this.db.find({
        selector: query,
        fields: ['_id', '_rev', ...Object.keys(query), ...fields], // Include additional fields if needed
      });

      return result.docs;
    } catch (error) {
      throw error;
    }
  }

  async findByPrefix(prefix: string, fields: any[] = []): Promise<DataDocument[]> {
    try {
      const result = await this.db.find({
        selector: {
          _id: {
            $gte: `${prefix}`,
            $lt: `${prefix}\ufff0`,
          },
        },
        fields: fields,
      });

      return result.docs;
    } catch (error) {
      throw error;
    }
  }

  async read(id: string): Promise<any> {
    try {
      const result = await this.db.get(id);
      return result;
    } catch (error) {
      if (error.statusCode === 404) {
        return null; // Document not found
      }
      throw error;
    }
  }

  async readAll(): Promise<DataDocument[]> {
    const result = await this.db.list({ include_docs: true });
    return result.rows.map(row => row.doc);
  }

  async update(id: string, newData: Partial<DataDocument>): Promise<DocumentInsertResponse> {
    const existingData = await this.read(id);

    if (!existingData) {
      throw new Error(`Document with id ${id} not found`);
    }

    const updatedData: DataDocument = { ...existingData, ...newData };
    const result = await this.db.insert(updatedData, id);
    return result;
  }

  async delete(id: string): Promise<DocumentDestroyResponse> {
    const existingData = await this.read(id);

    if (!existingData) {
      throw new Error(`Document with id ${id} not found`);
    }

    const result = await this.db.destroy(id, existingData._rev);
    return result;
  }

  async insert(data: DataDocument): Promise<DocumentInsertResponse> {
    const result = await this.db.insert(data);
    return result;
  }

  async upsert(id: string, data: DataDocument): Promise<DocumentInsertResponse> {
    try {
      const existingData = await this.read(id);

      if (existingData) {
        // If the document already exists, update it
        data._rev = existingData._rev;
      }

      const result = await this.db.insert(data, id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}