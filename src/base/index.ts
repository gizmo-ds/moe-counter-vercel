export { default as Fauna } from "./fauna";
export { default as Deta } from "./deta";
export { default as Mongo } from "./mongo";

export interface IBase {
  Init(): Promise<void>;
  Get(key: string): Promise<any>;
  Delete(key: string): Promise<void>;
  Clear(): Promise<void>;
}
