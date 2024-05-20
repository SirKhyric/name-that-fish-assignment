import { Component } from "react";
import "./styles/game-board.css";


export class ClassGameBoard extends Component {

  state = {
    currentIndex: 0,
    guess: "",
    guessSubmitted: false
  }

  handleGuessSubmit = (e) => {
    e.preventDefault();
    const { currentIndex, guess } = this.state;
    const { initialFishes, guessingResult, onGameOver } = this.props;

    if (!this.state.guessSubmitted) {
      const guessedFish = guess.toLowerCase();
      const isCorrectGuess = guessedFish === initialFishes[currentIndex].name.toLowerCase();

      guessingResult(isCorrectGuess, initialFishes[currentIndex].name.toLowerCase());

      if (currentIndex < initialFishes.length - 1) {
        this.setState({ currentIndex: currentIndex + 1 });
      } else {
        onGameOver();
      }

      this.setState({ guess: "", guessSubmitted: true });
    }
  };

  componentDidUpdate(_, prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      this.setState({ guessSubmitted: false });
    }
  }

  handleInputChange = (e) => {
    this.setState({ guess: e.target.value });
  };

  render() {
    const { currentIndex, guess } = this.state;
    const { initialFishes } = this.props;
    const nextFishToName = initialFishes[currentIndex];

    return (
      <div id="game-board">
        <div id="fish-container">
          <img src={nextFishToName.url} alt={nextFishToName.name} />
        </div>
        <form id="fish-guess-form" onSubmit={this.handleGuessSubmit}>
          <label htmlFor="fish-guess">What kind of fish is this?</label>
          <input 
            type="text" 
            name="fish-guess" 
            value={guess}
            onChange={this.handleInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
