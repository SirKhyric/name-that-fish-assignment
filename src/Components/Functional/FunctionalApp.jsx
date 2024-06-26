
import { FunctionalScoreBoard } from "./FunctionalScoreBoard";
import { FunctionalFinalScore } from "./FunctionalFinalScore";
import { initialFishes } from "../../constant/fishes";
import FunctionalGameBoard from "./FunctionalGameBoard";
import { useState } from "react";

export function FunctionalApp() {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const answersNumber = correctCount + incorrectCount;
  const gameOver = initialFishes.length === answersNumber;
  const answersLeft = initialFishes.map(fish => fish.name).slice(answersNumber);

  const handleGuessResult = (answer) => {
    if (answer === initialFishes[answersNumber].name) {
      setCorrectCount(prevCount => prevCount + 1);
    } else {
      setIncorrectCount(prevCount => prevCount + 1);
    }
  };

  return (
    <>
      {!gameOver && (
        <>
          <FunctionalScoreBoard 
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            answersLeft={answersLeft}
          />
          <FunctionalGameBoard 
            fishData={initialFishes[answersNumber]}
            guessingResult={handleGuessResult}
          />
        </>
      )}
      {gameOver && (
        <FunctionalFinalScore 
          correctCount={correctCount}
          totalCount={answersNumber}
        />
      )}
    </>
  );
}
