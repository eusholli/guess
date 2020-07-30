import fetch from "isomorphic-unfetch";
import React from "react";
import PropTypes from "prop-types";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const TopScores = ({ scores }) => {
  //  const [results, setResults] = useState(scores);

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  console.log(
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout
  );

  return (
    <div className="md:px-32 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white text-center">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 p-3 uppercase font-semibold text-sm">
                Rank
              </th>
              <th className="w-1/3 p-3 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="p-3 uppercase font-semibold text-sm">Guesses</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {scores.map((score, index) => {
              const shade =
                index % 2 === 1 ? "bg-gray-100" : "bg-gray-500 text-white";
              return (
                <tr className={shade} key={score._id}>
                  <td className="w-1/3 p-3 text-xl">{index + 1}</td>
                  <td className="w-1/3 p-3 text-xl">{score.name}</td>
                  <td className="w-1/3 p-3 text-xl">{score.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TopScores.propTypes = {
  scores: PropTypes.array,
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/top`);
  const json = await res.json();
  return {
    props: {
      scores: json,
    },
  };
}

export default withAuthenticationRequired(TopScores);
