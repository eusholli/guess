import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  try {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db("guess");
    return next();
  } catch (err) {
    console.error(err);
  }
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
