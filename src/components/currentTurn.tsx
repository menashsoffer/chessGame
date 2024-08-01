import { Color } from "chess.js";

interface Props {
  playerTurn: Color;
}

const CurrentTurn = ({ playerTurn }: Props) => {
  return (
    <div className={`current-turn ${playerTurn}`}>
      Current Turn: {playerTurn === "w" ? "White" : "Black"}
    </div>
  );
};

export default CurrentTurn;
