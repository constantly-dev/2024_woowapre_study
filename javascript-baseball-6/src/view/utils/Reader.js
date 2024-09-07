import { Console } from '@woowacourse/mission-utils';

export default class Reader {
  static async read(input) {
    return await Console.readLineAsync(input);
  }

  static async readNumbers(message) {
    const numbersString = await this.read(message);
    return this.numbersToArrayNumbers(numbersString);
  }

  static numbersToArrayNumbers(numbersString) {
    const numbers = numbersString.split('').map(Number);
    this.#validateAllNumbers(numbers);
    return numbers;
  }

  static #validateAllNumbers(numbers) {
    numbers.forEach((element) => {
      if (isNaN(element)) {
        throw new Error('숫자가 아닙니다.');
      }
    });
  }
}
