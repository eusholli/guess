import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import Nav from "./nav2";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        <button
          className="pr-2"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log out
        </button>
        <Nav />
      </div>
    );
  } else {
    return (
      <div>
        <Link href="/top">
          <a className="pr-2">Top Scores</a>
        </Link>
        <button className="pr-2" onClick={() => loginWithRedirect()}>
          Log In
        </button>
      </div>
    );
  }
};

export default LoginButton;
