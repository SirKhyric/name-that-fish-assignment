
import { FunctionalScoreBoard } from "./FunctionalScoreBoard";
import { FunctionalFinalScore } from "./FunctionalFinalScore";
import { initialFishes } from "../../Constant/fishes";
import FunctionalGameBoard from "./FunctionalGameBoard";
import { useState } from "react";

export function FunctionalApp() {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [answersLeft, setAnswersLeft] = useState(initialFishes.map(fish => fish.name.toLowerCase()));
  

  const handleGuessResult = (isCorrect, correctFish) => {
    if (isCorrect) {
      setCorrectCount(prevCount => prevCount + 1);
    } else {
      setIncorrectCount(prevCount => prevCount + 1);
    }
   
    setAnswersLeft(prevAnswersLeft => {
      const index = prevAnswersLeft.indexOf(correctFish);
      if (index !== -1) {
        return [...prevAnswersLeft.slice(0, index), ...prevAnswersLeft.slice(index + 1)];
      }
      return prevAnswersLeft;
    });

    if (correctCount + incorrectCount + 1 === initialFishes.length) {
      setGameOver(true); 
    }
  };

  return (
    <>
      <FunctionalScoreBoard 
        initialFishes={initialFishes}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        answersLeft={answersLeft}
      />
      {!gameOver && (
        <FunctionalGameBoard 
          initialFishes={initialFishes}
          guessingResult={handleGuessResult}
          onGameOver={() => setGameOver(true)}
        />
      )}
      {gameOver && (
        <FunctionalFinalScore 
          correctCount={correctCount}
          totalCount={correctCount + incorrectCount}
        />
      )}
    </>
  );
}
