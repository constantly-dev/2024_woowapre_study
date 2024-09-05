// static은 외부 클래스에 참조되는 횟수가 많다고 판단될때 사용

import BaseBallPolicy from './BaseBallPolicy.js';
import GameRoundResponse from './GameRoundResponse.js';

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

  #generateRandomNumbers = async () => {
    this.#computer = this.#baseBallPolicy.generateRandomNumbers();
  };

  processRoundResult = async (user) => {
    const ballCount = await this.#processBall(this.#computer, user);
    const strikeCount = await this.#processStrike(this.#computer, user);
    return new GameRoundResponse(ballCount, strikeCount);
  };

  #processBall = async (computer, user) => {
    const ballCount = computer.filter((comNumber, index) =>
      this.#baseBallPolicy.isBall(computer, user, index, comNumber)
    ).length;
    return ballCount;
  };

  #processStrike = async (computer, user) => {
    const strikeCount = user.filter((userNumber, index) =>
      this.#baseBallPolicy.isStrike(computer, userNumber, index)
    ).length;
    return strikeCount;
  };

  processGameEnd = (ballAndStrikeCount) => {
    return this.#baseBallPolicy.isGameEnd(ballAndStrikeCount);
  };

  processValidateNumbers = (input) => {
    this.#baseBallPolicy.validateUserNumbers(input);
  };

  processValidateRetry = (reKeyword) => {
    this.#baseBallPolicy.validateRetry(reKeyword);
  };
}
