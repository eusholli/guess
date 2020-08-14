// /pages/_error.js

import React from "react";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/react";

const Error = (error) => {
  Sentry.captureException(error);
  const statusCode = error.statusCode ? error.statusCode : "undefined";
  const message = error.message ? error.message : "undefined";
  return (
    <div className="section">
      <p className="text-center text-3xl">
        Server says &quot;Oops!&quot; - {statusCode}
      </p>
      <p className="text-center text-2xl">{message}</p>
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.object,
};

export default Error;
