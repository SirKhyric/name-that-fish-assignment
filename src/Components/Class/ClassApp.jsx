import { Component } from "react";
import { ClassScoreBoard } from "./ClassScoreBoard";
import { ClassGameBoard } from "./ClassGameBoard";
import { ClassFinalScore } from "./ClassFinalScore";
import { initialFishes } from "../../Constant/fishes";

export class ClassApp extends Component {
  state = {
    incorrectCount: 0,
    correctCount: 0,
    gameOver: false,
    answersLeft: initialFishes.map(fish => fish.name.toLowerCase())
  };

  handleGuessResult = (isCorrect, correctFish) => {
    this.setState((prevState) => {
      const { correctCount, incorrectCount, answersLeft } = prevState;
      const newAnswersLeft = answersLeft.filter(answer => answer !== correctFish);
      const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
      const newIncorrectCount = isCorrect ? incorrectCount : incorrectCount + 1;

      if (newCorrectCount + newIncorrectCount === initialFishes.length) {
        return {
          correctCount: newCorrectCount,
          incorrectCount: newIncorrectCount,
          answersLeft: newAnswersLeft,
          gameOver: true
        };
      }

      return {
        correctCount: newCorrectCount,
        incorrectCount: newIncorrectCount,
        answersLeft: newAnswersLeft
      };
    });
  };

  render() {
    const { correctCount, incorrectCount, gameOver, answersLeft } = this.state;

    return (
      <>
        <ClassScoreBoard 
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          answersLeft={answersLeft}
        />
        {!gameOver && (
          <ClassGameBoard 
            initialFishes={initialFishes}
            guessingResult={this.handleGuessResult}
            onGameOver={() => this.setState({ gameOver: true })}
          />
        )}
        {gameOver && (
          <ClassFinalScore 
            correctCount={correctCount}
            totalCount={correctCount + incorrectCount}
          />
        )}
      </>
    );
  }
}
