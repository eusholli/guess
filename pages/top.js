import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

const TopScores = ({ scores }) => {
  return (
    <div className="w-full">
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
  try {
    const response = await axios(`${process.env.NEXT_PUBLIC_API_BASE}/api/top`);
    return {
      props: {
        scores: response.data,
      },
    };
  } catch (error) {
    console.log("error caught");
    if (error.response) {
      return {
        props: {
          error: {
            status: error.response.status,
            message: error.response.data.message,
          },
        },
      };
    } else {
      return {
        props: {
          error: { status: 500, message: "Unknown Error" },
        },
      };
    }
  }
}

export default TopScores;
