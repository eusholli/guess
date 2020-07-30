import "../styles/index.css";
import App from "next/app";
import Layout from "../components/layout";
import React from "react";
import Router from "next/router";
import { Auth0Provider } from "@auth0/auth0-react";

const onRedirectCallback = (appState) => {
  // Use Next.js's Router.replace method to replace the url
  Router.replace(appState?.returnTo || "/");
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTHO_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTHO_CLIENT_ID}
        redirectUri={typeof window !== "undefined" && window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Layout>
          <Component {...pageProps}></Component>
        </Layout>
      </Auth0Provider>
    );
  }
}

export default MyApp;
