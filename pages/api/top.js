import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const docs = await req.db
      .collection("guess.scores")
      .aggregate([{ $sort: { score: 1 } }, { $limit: 5 }])
      .toArray();

    console.log(docs);
    res.json(docs);
  } catch (err) {
    console.error(err);
  }
});

export default handler;
