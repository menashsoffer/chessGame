import "./App.css";
import ChessPlayersInput from "./components/playersNames/chessPlayersInput";
import { useState, useEffect } from "react";
import { Chess, Color } from "chess.js";
import Header from "./components/header";
import ChessboardContainer from "./components/chessboardContainer";
import { Players } from "./interfaces/players";

const App = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerTurn, setPlayerTurn] = useState<Color>("w");
  const [error, setError] = useState<string | null>(null);
  const [names, setNames] = useState<Players>({ black: "", White: "" });

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

  //Reset the game
  const restartGame = () => {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
    setPlayerTurn("w");
    setError(null);
  };

  //Listen for Enter key press to restart the game
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

  const handlePlayersSubmit = ({ black, White }: Players) => {
    setNames({ black, White });
  };

  const isNamesEmpty = names.black === "" && names.White === "";

  return (
    <div className="app">
      <Header />
      {isNamesEmpty && <ChessPlayersInput onSubmit={handlePlayersSubmit} />}
      {!isNamesEmpty && (
        <ChessboardContainer
          myProps={{
            game,
            winner,
            gameOver,
            playerTurn,
            error,
            names,
            setGame,
            setWinner,
            setGameOver,
            setPlayerTurn,
            setError,
          }}
        />
      )}
    </div>
  );
};

export default App;
