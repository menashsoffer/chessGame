import GameOver from "./gameOver";
import CurrentTurn from "./currentTurn";
import notify from "../functions/notify";
import { Chess, Color } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ToastContainer } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  myProps: {
    game: Chess;
    setGame: Dispatch<SetStateAction<Chess>>;
    winner: string | null;
    setWinner: Dispatch<SetStateAction<string | null>>;
    gameOver: boolean;
    setGameOver: Dispatch<SetStateAction<boolean>>;
    playerTurn: Color;
    setPlayerTurn: Dispatch<SetStateAction<Color>>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
  };
}

const ChessboardContainer = ({ myProps }: Props) => {
  const {
    game,
    winner,
    gameOver,
    playerTurn,
    error,
    setGame,
    setGameOver,
    setWinner,
    setPlayerTurn,
    setError,
  } = myProps;
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
        error && notify(error);
        return false;
      }

      safeGameMutate((game) => {
        move = game.move({
          from: source,
          to: target,
          promotion: "q",
        });
      });
    } catch (err) {
      setError("Invalid move! Please try again.");
      error && notify(error);
      return false;
    }

    // illegal move
    if (move === null) {
      setError("Illegal move! Please try again.");
      error && notify(error);
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

  return (
    <div className="chessboard-container">
      {gameOver && <GameOver winner={winner} />}
      {!gameOver && (
        <div>
          {playerTurn === "b" && (
            <CurrentTurn
              className="current-turn-black"
              playerTurn={playerTurn}
            />
          )}
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            animationDuration={300}
          />
          {playerTurn === "w" && (
            <CurrentTurn
              className="current-turn-white"
              playerTurn={playerTurn}
            />
          )}
        </div>
      )}
      {error && <ToastContainer />}
    </div>
  );
};

export default ChessboardContainer;
