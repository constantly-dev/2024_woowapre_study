import { Random } from '@woowacourse/mission-utils';
import UserNumbersValidator from './UserNumbersValidator.js';
import UserRetryValidator from './UserRetryValidator.js';

export default class BaseBallPolicy {
  static MIN_NUMBER = 1;
  static MAX_NUMBER = 9;
  static GAME_NUMBER_LENGTH = 3;

  #userNumbersValidator = new UserNumbersValidator();
  #userRetryValidator = new UserRetryValidator();

  isStrike = (computer, userNumber, index) => {
    return computer[index] === userNumber;
  };

  isBall = (computer, user, index, comNumber) => {
    return user.includes(comNumber) && computer[index] !== user[index];
  };

  isGameEnd = (instance) => {
    return instance.getStrikeCount() === BaseBallPolicy.GAME_NUMBER_LENGTH;
  };

  generateRandomNumbers = () => {
    return Random.pickUniqueNumbersInRange(
      BaseBallPolicy.MIN_NUMBER,
      BaseBallPolicy.MAX_NUMBER,
      BaseBallPolicy.GAME_NUMBER_LENGTH
    );
  };

  validateUserNumbers = (input) => {
    this.#userNumbersValidator.validate(input);
  };

  validateRetry = (reKeyword) => {
    this.#userRetryValidator.validate(reKeyword);
  };
}
