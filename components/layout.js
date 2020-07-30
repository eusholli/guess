import Head from "next/head";
import Link from "next/link";
import LoginButton from "./login";
import React from "react";
import PropTypes from "prop-types";

export default function Layout(props) {
  return (
    <main className="flex-col">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Guess!</title>
      </Head>

      <header className="section flex justify-between items-center">
        <div className="text-3xl">
          <Link href={"/"}>
            <a>Guess!</a>
          </Link>
        </div>
        <div>
          <LoginButton />
        </div>
      </header>

      {props.children}

      <footer className="section flex justify-between items-center">
        <div className="text-xs text-gray-200 leading-normal">
          <Link href={"/privacy"}>
            <a>Privacy Policy</a>
          </Link>
        </div>
        <div className="text-xs text-gray-200 leading-normal">
          Geoff Hollingworth
          <br />
          <a href={"https://github.com/eusholli/guess"}>
            {"https://github.com/eusholli/guess"}
          </a>
        </div>
      </footer>
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
