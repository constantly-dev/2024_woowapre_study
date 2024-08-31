export default class UserRetryValidator {
  #validateNumber = (input) => {
    if (input !== '1' && input !== '2') {
      throw new Error('1 또는 2를 입력해주세요.');
    }
  };
  validate = (input) => {
    this.#validateNumber(input);
  };
}
