import React from "react";
import Link from "next/link";
import Nav from "./nav2";

const LoginButton = () => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return (
      <div>
        <button className="pr-2">Log out</button>
        <Nav />
      </div>
    );
  } else {
    return (
      <div>
        <Link href="/top">
          <a className="pr-2">Top Scores</a>
        </Link>
        <button className="pr-2">Log In</button>
      </div>
    );
  }
};

export default LoginButton;
