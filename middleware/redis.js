import redis from "redis";
import { promisify } from "util";
var createError = require("http-errors");

class DBP {
  constructor(client) {
    this.dbClient = client;
    this.azadd = promisify(client.zadd).bind(client);
    this.azrange = promisify(client.zrange).bind(client);
  }

  async top(limit = 10) {
    console.log("in redis top");
    try {
      const docs = await this.azrange(
        "scores",
        0,
        limit === 0 ? 0 : limit - 1,
        "withscores"
      );
      let scores = [];
      if (docs) {
        for (let x = 0; x < docs.length - 1; x += 2) {
          scores.push({
            _id: docs[x],
            name: docs[x],
            score: docs[x + 1],
          });
        }
      }
      return scores;
    } catch (error) {
      throw createError(503, "Error in fetching top scores from redis", error);
    }
  }

  async addScore(name, score) {
    if (!name || name === "" || !score || score === "" || isNaN(score)) {
      throw createError(
        503,
        `Argument Error in adding score (name: ${name}, score: ${score})`
      );
    }
    try {
      const result = await this.azadd(["scores", parseInt(score), name]);
      console.log("added " + result + " items.");
    } catch (error) {
      console.log(error);
      throw createError(
        503,
        `Error in adding score (${name},${score}) from redis`,
        error
      );
    }
  }
}

function database(req, res, next) {
  // console.log("client: " + JSON.stringify(client, null, 4));
  console.log("client.connection_id: " + client.connection_id);
  req.dbp = dbp;
  next();
}

console.log("creating new redisClient");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PWD,
});

client.on("connect", function () {
  console.log("Redis client connected");
});

client.on("error", function (err) {
  console.warn("Redis not connected");
  throw err;
});

const dbp = new DBP(client);

export default database;
