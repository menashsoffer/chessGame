import { Color } from "chess.js";

interface Props {
  playerTurn: Color;
  className: string;
}

const CurrentTurn = ({ playerTurn, className }: Props) => {
  return (
    <div className={className}>
      Current Turn: {playerTurn === "w" ? "White" : "Black"}
    </div>
  );
};

export default CurrentTurn;
