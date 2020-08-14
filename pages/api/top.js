import database from "../../middleware/redis";
import createHandler from "../../middleware/createhandler";

const handler = createHandler();

handler.use(database);

handler.get(async (req, res) => {
  console.log("In apiroute top");
  const docs = await req.dbp.top(5);
  res.json(docs);
});

export default handler;
