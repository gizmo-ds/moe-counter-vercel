import * as deta from "deta";
import Base from "deta/dist/types/base";
import { ObjectType } from "deta/dist/types/types/basic";

export default class Deta {
  private db: Base;

  public constructor(project_key: string, project_base: string) {
    this.db = deta.Deta(project_key).Base(project_base);
  }

  public async Init(): Promise<void> {}

  public async Get(key: string): Promise<any> {
    let data: ObjectType;
    try {
      data = await this.db.get(key);
      //@ts-ignore
      data.num++;
      await this.db.update({ num: data.num }, key);
    } catch (error) {
      data = await this.db.put({ key: key, num: 1 }, key);
    }
    return data;
  }

  public async Delete(key: string): Promise<void> {
    await this.db.delete(key);
  }

  public async Clear(): Promise<void> {
    const items = await this.db.fetch();
    for (const item in items.items) {
      //@ts-ignore
      await this.Delete(item.key);
    }
  }
}
