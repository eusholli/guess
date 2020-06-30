import Head from "next/head";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(value, i) {
    return (
      <Square key={i} value={value} onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    const items = [];
    const self = this;
    this.props.squares.forEach(function (value, i) {
      items.push(self.renderSquare(value, i));
    });

    return <div className="flex flex-wrap justify-center">{items}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.startGame();
  }

  startGame() {
    const squares = this.initSquares();
    const attempts = 0;
    const answer = getRandomInt(1, 30);
    const winner = false;

    return {
      squares,
      attempts,
      answer,
      winner,
    };
  }

  resetGame() {
    this.setState(this.startGame());
  }

  initSquares() {
    let squares = [];
    for (let i = 1; i < 31; i++) {
      squares.push(i);
    }
    return squares;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const attempts = this.state.attempts;
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

    if (this.state.winner || (squares && squares[i] === wrong)) {
      return;
    } else if (squares[i] === this.state.answer) {
      squares[i] = winner;
      win = true;
    } else {
      squares[i] = wrong;
      win = false;
    }

    this.setState({
      squares: squares,
      attempts: attempts + 1,
      winner: win,
    });
  }

  render() {
    const status = this.state.winner ? "Win in " : "Attempts: ";
    return (
      <div className="flex-col">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>Number Guess</title>
        </Head>

        <header className="section text-3xl">Number Guess</header>
        <main className="section">
          <div className="flex flex-row justify-around">
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"
                onClick={this.resetGame.bind(this)}
              >
                Play Again
              </button>
            </div>
            <div className="bg-blue-500 text-white font-bold py-2 px-4 my-2 rounded">
              {status} {this.state.attempts}
            </div>
          </div>
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </main>

        <footer className="section">
          <p className="text-xs text-gray-200 leading-normal text-right">
            Geoff Hollingworth
            <br />
            <a href={"https://github.com/eusholli/guess"}>
              {"https://github.com/eusholli/guess"}
            </a>
          </p>
        </footer>
      </div>
    );
  }
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
