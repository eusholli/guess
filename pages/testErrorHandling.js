import React from "react";
import PropTypes from "prop-types";
import { withAuthenticationRequired } from "@auth0/auth0-react";
// import Error from "./_error.js";

const TestErrorHandling = ({ scores }) => {
  return (
    <div className="section md:px-32 w-full">
      <p>rendering {scores}</p>
    </div>
  );
};

TestErrorHandling.propTypes = {
  error: PropTypes.object,
  scores: PropTypes.array,
};

export async function getServerSideProps() {
  console.log("in getServerSideProps");
  return {
    props: {
      error: {
        statusCode: 503,
        message: "fuck",
      },
    },
  };
}

export default withAuthenticationRequired(TestErrorHandling);
