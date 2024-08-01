import "./App.css";
import { useState, useEffect } from "react";
import { Chess, Color } from "chess.js";
import Header from "./components/header";
import ChessboardContainer from "./components/chessboardContainer";

const App = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerTurn, setPlayerTurn] = useState<Color>("w");
  const [error, setError] = useState<string | null>(null);

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
      <Header />
      <ChessboardContainer
        myProps={{
          game,
          winner,
          gameOver,
          playerTurn,
          error,
          setGame,
          setWinner,
          setGameOver,
          setPlayerTurn,
          setError,
        }}
      />
    </div>
  );
};

export default App;
