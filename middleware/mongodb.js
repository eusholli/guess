import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.MONGODB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class DBP {
  constructor(client) {
    this.dbClient = client;
    this.db = client.db("guess");
    this.collection = this.db.collection("guess.scores");
  }

  async top(limit = 10) {
    try {
      const docs = await this.collection
        .find()
        .limit(limit)
        .sort([["score", 1]])
        .toArray();

      return docs;
    } catch (err) {
      console.error(err);
    }
  }

  async addScore(name, score) {
    try {
      await this.db
        .collection("guess.scores")
        .insertOne({ name: name, score: parseInt(score) });
    } catch (error) {
      console.log(error);
      throw "add score error";
    }
  }
}

async function database(req, res, next) {
  try {
    if (!client.isConnected()) await client.connect();
    req.dbp = new DBP(client);
    //req.dbClient = client;
    //req.db = client.db("guess");
    return next();
  } catch (err) {
    console.error(err);
  }
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
