import { Component } from "react";
import "./styles/game-board.css";


export class ClassGameBoard extends Component {

  state = {
    guess: "",
  }

  handleGuessSubmit = (e) => {
    e.preventDefault();
    const guessedFish = this.state.guess.toLowerCase();
    this.props.guessingResult(guessedFish);
    this.setState({ guess: "" });
  };

  render() {
    const { guess } = this.state;
    const { fishData } = this.props;
    
    return (
      <div id="game-board">
        <div id="fish-container">
          <img src={fishData.url} alt={fishData.name} />
        </div>
        <form id="fish-guess-form" onSubmit={this.handleGuessSubmit}>
          <label htmlFor="fish-guess">What kind of fish is this?</label>
          <input 
            type="text" 
            name="fish-guess" 
            value={guess}
            onChange={(e) => this.setState({ guess: e.target.value })}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
