import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const name = req.query.name;
  const score = req.query.score;

  await req.db
    .collection("guess.scores")
    .insertOne({ name: name, score: score });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "success" }));
});

export default handler;
