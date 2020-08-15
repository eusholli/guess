import React, { useContext, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import GameContext from "../contexts/GameContext";

function Square(props) {
  const [game, setGame] = useContext(GameContext);
  const handleClick = (i) => {
    const squares = game.squares.slice();
    const attempts = game.attempts;
    let wrong;

    if (attempts >= 25) {
      wrong = "💀";
    } else if (attempts >= 20) {
      wrong = "🤕";
    } else if (attempts >= 15) {
      wrong = "🥵";
    } else if (attempts >= 10) {
      wrong = "😶";
    } else if (attempts >= 5) {
      wrong = "😐";
    } else {
      wrong = "😒";
    }

    const winner = "😍";
    let win;

    if (game.winner || (squares && isNaN(squares[i]))) {
      return;
    } else if (squares[i] === game.answer) {
      squares[i] = winner;
      win = true;
    } else {
      squares[i] = wrong;
      win = false;
    }

    setGame({
      squares: squares,
      attempts: attempts + 1,
      winner: win,
      answer: game.answer,
    });
  };
  return (
    <button className="square" onClick={() => handleClick(props.i)}>
      {props.value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  i: PropTypes.number,
};

function Board(props) {
  const renderSquare = (value, i) => {
    return <Square key={i} i={i} value={value.toString()} />;
  };
  const items = [];
  props.squares.forEach(function (value, i) {
    items.push(renderSquare(value, i));
  });

  return <div className="flex flex-wrap justify-center">{items}</div>;
}

Board.propTypes = {
  squares: PropTypes.node,
};

function Game() {
  const initSquares = () => {
    let squares = [];
    for (let i = 1; i < 31; i++) {
      squares.push(i);
    }
    return squares;
  };

  const startGame = () => {
    const squares = initSquares();
    const attempts = 0;
    const answer = getRandomInt(1, 30);
    const winner = false;

    return {
      squares,
      attempts,
      answer,
      winner,
    };
  };

  const [game, setGame] = useState(startGame());

  const resetGame = () => {
    setGame(startGame());
  };

  const status = game.winner ? "Win in " : "Attempts: ";
  return (
    <GameContext.Provider value={[game, setGame]}>
      <div className="section">
        <Head>
          <title>Guess - Play</title>
        </Head>

        <div className="flex flex-row justify-around">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"
              onClick={() => resetGame()}
            >
              Play Again
            </button>
          </div>
          <div className="bg-blue-500 text-white font-bold py-2 px-4 my-2 rounded">
            {status} {game.attempts}
          </div>
        </div>
        <Board squares={game.squares} />
      </div>
    </GameContext.Provider>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ========================================

export default function IndexPage() {
  return <Game />;
}
