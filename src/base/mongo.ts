import { Collection, MongoClient } from "mongodb";

export default class Mongo {
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;
  private coll: Collection;

  public constructor(uri: string, private collection: string) {
    this.client = new MongoClient(uri, {});
    this.clientPromise = this.client.connect();
  }

  public async Init(): Promise<void> {
    const client = await this.clientPromise;
    this.coll = client.db().collection(this.collection);
  }

  public async Get(key: string): Promise<any> {
    const doc = await this.coll.findOneAndUpdate({ key }, { $inc: { num: 1 } });
    if (!doc || !doc.value) {
      this.coll.insertOne({ key, num: 1 });
      return { key, num: 1 };
    }
    return { key, num: doc.value.num + 1 };
  }

  public async Delete(key: string): Promise<void> {
    await this.coll.deleteOne({ key });
  }

  public async Clear(): Promise<void> {
    await this.coll.drop();
  }
}
