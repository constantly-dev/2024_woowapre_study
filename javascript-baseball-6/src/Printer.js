import { Console } from '@woowacourse/mission-utils';

export default class Printer {
  static async print(output) {
    await Console.print(output);
  }
}
