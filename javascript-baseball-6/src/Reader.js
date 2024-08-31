import { Console } from '@woowacourse/mission-utils';

export default class Reader {
  static async read(input) {
    return await Console.readLineAsync(input);
  }
}
