import { Random } from '@woowacourse/mission-utils';

export default class BaseBallPolicy {
  static MIN_NUMBER = 1;
  static MAX_NUMBER = 9;
  static GAME_NUMBER_LENGTH = 3;

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
    this.#validateNumberLen(input);
    this.#validateConflict(input);
  };

  #validateNumberLen = (input) => {
    if (input.length !== BaseBallPolicy.GAME_NUMBER_LENGTH) {
      throw new Error(
        `[ERROR] 입력한 숫자는 반드시 ${BaseBallPolicy.GAME_NUMBER_LENGTH}자리여야 합니다.`
      );
    }
  };

  #validateConflict = (input) => {
    const uniqueDigits = new Set(input);
    if (uniqueDigits.size !== BaseBallPolicy.GAME_NUMBER_LENGTH) {
      throw new Error('[ERROR] 입력한 숫자에 중복된 숫자가 있습니다.');
    }
  };
}
