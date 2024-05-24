import { Component } from "react";
import { ClassScoreBoard } from "./ClassScoreBoard";
import { ClassGameBoard } from "./ClassGameBoard";
import { ClassFinalScore } from "./ClassFinalScore";
import { initialFishes } from "../../constant/fishes";

export class ClassApp extends Component {
  state = {
    incorrectCount: 0,
    correctCount: 0,
  };

  handleGuessResult = (answer) => {
    const { correctCount, incorrectCount } = this.state;
    const answersNumber = correctCount + incorrectCount;
    const StatePropToUpdate = answer === initialFishes[answersNumber].name ? 'correctCount' : 'incorrectCount';
    this.setState((prevState) => ({
      [StatePropToUpdate]: prevState[StatePropToUpdate] + 1,
    }));
  };

  render() {
    const { correctCount, incorrectCount } = this.state;
    const answersNumber = correctCount + incorrectCount;
    const gameOver = initialFishes.length === answersNumber;
    const answersLeft = initialFishes.map(fish => fish.name).slice(answersNumber);

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
