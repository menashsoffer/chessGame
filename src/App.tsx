import "./App.css";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const App = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Let's perform a function on the game state
  const safeGameMutate = (modify: (game: Chess) => void): void => {
    setGame((g) => {
      const update = new Chess();
      update.load(g.fen());
      modify(update);
      return update;
    });
  };

  // Movement of computer
  const makeRandomMove = (): void => {
    const possibleMove = game.moves();

    // exit if the game is over
    if (game.isGameOver() || game.isDraw() || possibleMove.length === 0) {
      setGameOver(true);
      const winner = game.turn() === "w" ? "Black" : "White";
      setWinner(winner);
      return;
    }

    // select random move
    const randomIndex = Math.floor(Math.random() * possibleMove.length);
    // play random move
    safeGameMutate((game) => {
      game.move(possibleMove[randomIndex]);
    });
  };

  // Perform an action when a piece is dropped by a user
  const onDrop = (source: string, target: string): boolean => {
    if (gameOver) return false;

    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion: "q",
      });
    });
    // illegal move
    if (move === null) return false;
    // valid move
    setTimeout(() => {
      makeRandomMove();
    }, 200);

    return true;
  };

  // Reset the game
  const restartGame = () => {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
  };

  // Listen for Enter key press to restart the game
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        restartGame();
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  console.log("Game FEN:", game.fen());
  console.log("Possible moves:", game.moves());

  return (
    <div className="app">
      <div className="header">
        <div className="game-info">
          <h1>Chess Game</h1>
        </div>
      </div>
      <div className="chessboard-container">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        {gameOver && (
          <div className="game-over">
            <p>Game Over</p>
            <p>Winner: {winner}</p>
            <p>Press Enter to restart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
