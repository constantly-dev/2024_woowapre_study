import { Random } from '@woowacourse/mission-utils';
import UserNumbersValidator from './UserNumbersValidator.js';

export default class BaseBallPolicy {
  static MIN_NUMBER = 1;
  static MAX_NUMBER = 9;
  static GAME_NUMBER_LENGTH = 3;

  #userNumbersValidator = new UserNumbersValidator();

  isStrike = (computer, userNumber, index) => {
    return computer[index] === userNumber;
  };

  isBall = (computer, user, index, comNumber) => {
    return user.includes(comNumber) && computer[index] !== user[index];
  };

  calculateStrikeCount = (computer, user) => {
    return user.filter((userNumber, index) =>
      this.isStrike(computer, userNumber, index)
    ).length;
  };

  calculateBallCount = (computer, user) => {
    return computer.filter((comNumber, index) =>
      this.isBall(computer, user, index, comNumber)
    ).length;
  };

  isGameEnd = (GameAsset) => {
    return GameAsset.getStrikeCount() === BaseBallPolicy.GAME_NUMBER_LENGTH;
  };

  generateRandomNumbers = () => {
    return Random.pickUniqueNumbersInRange(1, 9, 3);
  };

  validateUserNumbers = (input) => {
    this.#userNumbersValidator.validate(input);
  };
}
