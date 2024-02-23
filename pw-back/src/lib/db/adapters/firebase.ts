import { DatabaseAdapter } from "../index.ts";

export class FirebaseAdapter implements DatabaseAdapter {
  findBy(query: Record<string, any>): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  findByPrefix(arg0: string): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  create(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  read(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  readAll(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  insert(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  upsert(id: string, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

}