import BaseBallGame from '../model/BaseBallGame.js';
import NumbersInputView from '../view/input/NumbersInputView.js';
import RetryInputView from '../view/input/RetryInputView.js';
import FinalResultOutputView from '../view/output/FinalResultOutputView.js';
import RoundResultOutputView from '../view/output/RoundResultOutputView.js';
import StartOutputView from '../view/output/StartOutputView.js';
import UserRetryValidator from './validator/UserRetryValidator.js';

class App {
  #baseBallGame;
  #isGameEnd;
  #userRetryValidator;

  #numbersInputView;
  #retryInputView;

  #startOutputView;
  #roundResultOutputView;
  #finalResultOutputView;

  constructor() {
    this.#baseBallGame = new BaseBallGame();
    this.#isGameEnd = false;
    this.#userRetryValidator = new UserRetryValidator();

    this.#numbersInputView = new NumbersInputView();
    this.#retryInputView = new RetryInputView();

    this.#startOutputView = new StartOutputView();
    this.#roundResultOutputView = new RoundResultOutputView();
    this.#finalResultOutputView = new FinalResultOutputView();
  }

  async play() {
    await this.#processBeforeGame();

    while (!this.#isGameEnd) {
      const user = await this.#numbersInputView.read();

      const ballAndStrikeCount = this.#baseBallGame.processRound(user);

      await this.#processAfterRound(ballAndStrikeCount);
    }
  }

  async #processBeforeGame() {
    await this.#startOutputView.print();
    this.#baseBallGame.startGame();
    this.#isGameEnd = false;
  }

  async #processAfterRound(ballAndStrikeCount) {
    await this.#roundResultOutputView.print(ballAndStrikeCount);

    this.#updateIsGameEnd(ballAndStrikeCount);
    await this.#processRetryCheck();
  }

  async #processRetryCheck() {
    if (this.#isGameEnd) {
      await this.#finalResultOutputView.print();
      const reKeyword = await this.#readRetry();

      if (this.#shouldRetry(reKeyword)) {
        this.#baseBallGame.restartGame();
        this.#isGameEnd = false;
      }
    }
  }

  #readRetry = async () => {
    const reKeyword = await this.#retryInputView.read();
    this.#userRetryValidator.validate(reKeyword);
    return reKeyword;
  };

  #updateIsGameEnd = (ballAndStrikeCount) => {
    this.#isGameEnd = this.#baseBallGame.processGameEnd(ballAndStrikeCount);
  };

  #shouldRetry = (reKeyword) => {
    if (reKeyword === '1') {
      return true;
    }
    return false;
  };
}

export default App;
