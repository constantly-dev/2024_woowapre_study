// static은 외부 클래스에 참조되는 횟수가 많다고 판단될때 사용
import GameRoundResponse from '../dto/GameRoundResponse.js';
import BaseBallPolicy from './BaseBallPolicy.js';

export default class BaseBallGame {
  #baseBallPolicy;
  #computer;

  constructor() {
    this.#baseBallPolicy = new BaseBallPolicy();
    this.#computer = null;
  }

  startGame = () => {
    this.#generateRandomNumbers();
  };

  restartGame = () => {
    this.#generateRandomNumbers();
  };

  #generateRandomNumbers = () => {
    this.#computer = this.#baseBallPolicy.generateRandomNumbers();
  };

  processRound = (user) => {
    this.#validateNumbers(user);

    const ballCount = this.#processBall(this.#computer, user);
    const strikeCount = this.#processStrike(this.#computer, user);
    return new GameRoundResponse(ballCount, strikeCount);
  };

  #processBall = (computer, user) => {
    const ballCount = computer.filter((comNumber, index) =>
      this.#baseBallPolicy.isBall(computer, user, index, comNumber)
    ).length;
    return ballCount;
  };

  #processStrike = (computer, user) => {
    const strikeCount = user.filter((userNumber, index) =>
      this.#baseBallPolicy.isStrike(computer, userNumber, index)
    ).length;
    return strikeCount;
  };

  processGameEnd = (ballAndStrikeCount) => {
    return this.#baseBallPolicy.isGameEnd(ballAndStrikeCount);
  };

  #validateNumbers = (input) => {
    this.#baseBallPolicy.validateUserNumbers(input);
  };
}
