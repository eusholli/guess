import database from "../../middleware/redis";
import createHandler from "../../middleware/createhandler";

const handler = createHandler();

handler.use(database);

handler.get(async (req, res) => {
  const name = req.query.name;
  const score = req.query.score;
  await req.dbp.addScore(name, score);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "success" }));
});

export default handler;
