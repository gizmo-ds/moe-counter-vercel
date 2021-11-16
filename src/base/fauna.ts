import { default as fauna, Match, query as q } from "faunadb";
import { IBase } from ".";

export default class Fauna {
  private client: fauna.Client;
  private collection: string;

  public constructor(secret: string, collection: string) {
    this.client = new fauna.Client({ secret: secret });
    this.collection = collection;
  }

  public async Init(): Promise<void> {
    try {
      await this.client.query(q.Get(q.Index("moe-counter-get")));
    } catch (error) {
      await this.client
        .query(
          q.CreateIndex({
            name: "moe-counter-get",
            source: q.Collection(this.collection),
            terms: [{ field: ["data", "key"] }],
            values: [{ field: ["data", "num"] }],
            unique: true,
            serialized: true,
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }

    try {
      await this.client.query(q.Get(q.Function("moe-counter-add")));
    } catch (error) {
      await this.client
        .query(
          q.CreateFunction({
            name: "moe-counter-add",
            role: "server",
            body: q.Query(
              q.Lambda(
                "key",
                q.Let(
                  {
                    from: q.Get(
                      Match(q.Index("moe-counter-get"), q.Var("key"))
                    ),
                    ref: q.Select("ref", q.Var("from")),
                    data: q.Select("data", q.Var("from")),
                  },
                  q.Update(q.Var("ref"), {
                    data: {
                      key: q.Var("key"),
                      num: q.Add(q.Select("num", q.Var("data")), 1),
                    },
                  })
                )
              )
            ),
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }

  public async Get(key: string): Promise<any> {
    let data: any;
    try {
      data = await this.client.query(
        q.Select("data", q.Call("moe-counter-add", key))
      );
    } catch (error) {
      data = await this.client.query(
        q.Select(
          "data",
          q.Create(q.Collection(this.collection), {
            data: { key: key, num: 1 },
          })
        )
      );
    }
    return data;
  }

  public async Delete(key: string): Promise<void> {
    await this.client.query(
      q.Delete(q.Select("ref", q.Get(Match(q.Index("moe-counter-get"), key))))
    );
  }

  // 未实现
  public async Clear(): Promise<void> {}
}
