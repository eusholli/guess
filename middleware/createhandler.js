import nextConnect from "next-connect";
import * as Sentry from "@sentry/node";

async function onError(error, req, res) {
  console.log("in createhandler onError");
  //  console.log(error);
  Sentry.captureException(error);
  await Sentry.flush(2000);
  res.status(error.status).json(error);
}

export default function createHandler() {
  const errorHandler = nextConnect({ onError });
  return errorHandler;
}
