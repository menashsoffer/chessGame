import "./App.css";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Color } from "chess.js";
import CurrentTurn from "./components/currentTurn";
import GameOver from "./components/gameOver";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerTurn, setPlayerTurn] = useState<Color>("w");
  const [error, setError] = useState<string | null>(null);

  const notify = () =>
    toast.warn(error, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    // Check for game over
    if (game.isGameOver()) {
      setGameOver(true);
      const winner = game.isCheckmate()
        ? game.turn() === "w"
          ? "Black"
          : "White"
        : "Draw";
      setWinner(winner);
    }
  }, [game]);

  // Let's perform a function on the game state
  const safeGameMutate = (modify: (game: Chess) => void): void => {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  };

  // Perform an action when a piece is dropped by a user
  const onDrop = (source: string, target: string): boolean => {
    if (gameOver || game.turn() !== playerTurn) return false;

    let move = null;
    try {
      const legalMoves = game.moves({
        verbose: true,
      });
      const isValidMove = legalMoves.some(
        (m) => m.from === source && m.to === target
      );

      if (!isValidMove) {
        setError("Invalid move! Please try again.");
        notify();
        return false;
      }

      safeGameMutate((game) => {
        move = game.move({
          from: source,
          to: target,
          promotion: "q",
        });
      });
    } catch (error) {
      setError("Invalid move! Please try again.");
      notify();
      return false;
    }

    // illegal move
    if (move === null) {
      setError("Illegal move! Please try again.");
      notify();
      return false;
    }

    // Clear error message
    setError(null);

    //Check for game over
    if (game.isGameOver()) {
      console.log(gameOver);
      setGameOver(true);
      const winner = game.isCheckmate()
        ? game.turn() === "w"
          ? "Black"
          : "White"
        : "Draw";
      setWinner(winner);
      return true;
    }

    // Valid move
    setPlayerTurn(playerTurn === "w" ? "b" : "w");

    return true;
  };

  // Reset the game
  const restartGame = () => {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
    setPlayerTurn("w");
    setError(null);
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

  return (
    <div className="app">
      <div className="header">
        <div className="game-info">
          <h1>Chess Game</h1>
        </div>
      </div>
      <div className="chessboard-container">
        {gameOver && <GameOver winner={winner} />}
        {!gameOver && (
          <div>
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              animationDuration={300}
            />
            <CurrentTurn playerTurn={playerTurn} />
          </div>
        )}
        {error && <ToastContainer />}
      </div>
    </div>
  );
};

export default App;
