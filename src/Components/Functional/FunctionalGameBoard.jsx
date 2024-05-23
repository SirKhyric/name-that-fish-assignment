import "./styles/game-board.css";
import { useState } from "react";


function FunctionalGameBoard({ fishData, guessingResult }) {
  const [guess, setGuess] = useState("");

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const guessedFish = guess.toLowerCase();
    guessingResult(guessedFish);
    setGuess("");
  };

  return (
    <div id="game-board">
      <div id="fish-container">
        <img src={fishData.url} alt={fishData.name} />
      </div>
      <form id="fish-guess-form" onSubmit={handleGuessSubmit}>
        <label htmlFor="fish-guess">What kind of fish is this?</label>
        <input 
          type="text" 
          name="fish-guess" 
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <input type="submit"/>
      </form>
    </div>
  );
}

export default FunctionalGameBoard;