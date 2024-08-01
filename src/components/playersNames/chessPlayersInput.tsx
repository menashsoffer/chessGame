import React, { useState, FormEvent } from "react";
import "./chessPlayersInput.css"; // Import the CSS file
import { Players } from "../../interfaces/players";

interface ChessPlayersInputProps {
  onSubmit: (players: Players) => void;
}

const ChessPlayersInput: React.FC<ChessPlayersInputProps> = ({ onSubmit }) => {
  const [black, setBlack] = useState<string>("");
  const [White, setWhite] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (black && White) {
      onSubmit({ black, White });
    } else {
      alert("Please enter names for both players");
    }
  };

  return (
    <div className="form-container">
      <h1>Enter Chess Players' Names</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label> black player </label>
          <input
            type="text"
            value={black}
            onChange={(e) => setBlack(e.target.value)}
            required
          />
        </div>
        <div>
          <label>White player</label>
          <input
            type="text"
            value={White}
            onChange={(e) => setWhite(e.target.value)}
            required
          />
        </div>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default ChessPlayersInput;
