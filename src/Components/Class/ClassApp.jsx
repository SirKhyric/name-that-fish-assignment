import { Component } from "react";
import { ClassScoreBoard } from "./ClassScoreBoard";
import { ClassGameBoard } from "./ClassGameBoard";
import { ClassFinalScore } from "./ClassFinalScore";
import { initialFishes } from "../../constant/fishes";

export class ClassApp extends Component {
  state = {
    incorrectCount: 0,
    correctCount: 0,
    answersLeft: initialFishes.map(fish => fish.name)
  };

  handleGuessResult = (answer) => {
    this.setState((prevState) => {
      const { correctCount, incorrectCount, answersLeft } = prevState;
      const answersNumber = correctCount + incorrectCount;
      const isCorrect = answer === initialFishes[answersNumber].name;
      const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
      const newIncorrectCount = isCorrect ? incorrectCount : incorrectCount + 1;

      return {
        correctCount: newCorrectCount,
        incorrectCount: newIncorrectCount,
        answersLeft: answersLeft.filter(fishName => fishName !== initialFishes[answersNumber].name)
      };
    });
  };

  render() {
    const { correctCount, incorrectCount, answersLeft } = this.state;
    const answersNumber = correctCount + incorrectCount;
    const gameOver = initialFishes.length === answersNumber;

    return (
      <>
        {!gameOver && (
          <>
            <ClassScoreBoard 
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              answersLeft={answersLeft}
            />
            <ClassGameBoard 
              fishData={initialFishes[answersNumber]}
              guessingResult={this.handleGuessResult}
            />
          </>
        )}
        {gameOver && (
          <ClassFinalScore 
            correctCount={correctCount}
            totalCount={answersNumber}
          />
        )}
      </>
    );
  }
}
