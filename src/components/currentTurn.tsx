interface Props {
  playerName: string;
  className: string;
}

const CurrentTurn = ({ playerName, className }: Props) => {
  return <div className={className}>{playerName} it`s your turn</div>;
};

export default CurrentTurn;
