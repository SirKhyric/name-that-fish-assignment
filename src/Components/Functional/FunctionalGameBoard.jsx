import "./styles/game-board.css";
import { useEffect, useState } from "react";



function FunctionalGameBoard({ initialFishes, guessingResult, onGameOver }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextFishToName = initialFishes[currentIndex];
  const [guess, setGuess] = useState("");
  const [guessSubmitted, setGuessSubmitted] = useState(false);


  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (!guessSubmitted) {
      const guessedFish = guess.toLowerCase();
      const isCorrectGuess = guessedFish === nextFishToName.name.toLowerCase();

      guessingResult(isCorrectGuess, nextFishToName.name.toLowerCase());
      
      if (currentIndex < initialFishes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onGameOver();
      }
      setGuess("");
      setGuessSubmitted(true); 
    }
  };

  useEffect(() => {
    setGuessSubmitted(false);
  }, [currentIndex]);

  return (
    <div id="game-board">
      <div id="fish-container">
        <img src={nextFishToName.url} alt={nextFishToName.name} />
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