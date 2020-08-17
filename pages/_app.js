import "../styles/index.css";
import * as Sentry from "@sentry/react";
import App from "next/app";
import Layout from "../components/layout";
import React from "react";
import Router from "next/router";

import withError from "next-with-error";
import Error from "./_error";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    //enabled: process.env.NODE_ENV === 'production',
    enabled: true,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
    );
  }
}

export default withError(Error)(MyApp);
// export default MyApp;
