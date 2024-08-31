export default class UserNumbersValidator {
  // 숫자가 아닌 경우
  #validateNotNumber = (input) => {
    if (isNaN(Number(input))) {
      throw new Error('입력한 값이 숫자가 아닙니다.');
    }
  };

  // 숫자이지만 3자리가 아닌 경우
  #validateNumberLen = (input) => {
    if (input.length !== 3) {
      throw new Error('입력한 숫자는 반드시 3자리여야 합니다.');
    }
  };

  // 숫자이고 3자리지만 중복된 숫자가 있는 경우
  #validateConflict = (input) => {
    const digits = input.split('');
    const uniqueDigits = new Set(digits);
    if (uniqueDigits.size !== 3) {
      throw new Error('입력한 숫자에 중복된 숫자가 있습니다.');
    }
  };

  validate = (input) => {
    this.#validateNotNumber(input);
    this.#validateNumberLen(input);
    this.#validateConflict(input);
  };
}
