import { Console, Random } from '@woowacourse/mission-utils';
import UserNumbersValidator from './UserNumbersValidator.js';
import UserRetryValidator from './UserRetryValidator.js';
import Printer from './Printer.js';
import Reader from './Reader.js';
import GameAsset from './GameAsset.js';
import BaseBallPolicy from './BaseBallPolicy.js';

class App {
  #userNumbersValidator;
  #userRetryValidator;
  #gameAsset;
  #baseBallPolicy;
  constructor() {
    this.#userNumbersValidator = new UserNumbersValidator();
    this.#userRetryValidator = new UserRetryValidator();
    this.#gameAsset = new GameAsset();
    this.#baseBallPolicy = new BaseBallPolicy();
  }

  #shouldRetry = (reKeyword) => {
    this.#userRetryValidator.validate(reKeyword);
    if (reKeyword === '1') {
      return true;
    } else if (reKeyword === '2') {
      return false;
    }
  };

  async play() {
    await Printer.print('숫자 야구 게임을 시작합니다.');
    // 컴퓨터가 제공하는 랜덤 숫자 3자리 얻기
    const computer = Random.pickUniqueNumbersInRange(1, 9, 3);

    Printer.print(computer);
    this.#gameAsset.init();

    while (this.#gameAsset.getStrikeCount() !== 3) {
      this.#gameAsset.init();
      const input = await Reader.read('숫자를 입력해주세요 : ');

      this.#userNumbersValidator.validate(input);

      const user = input.split('').map(Number);

      // 컴퓨터 랜덤 숫자와 유저 입력 숫자를 비교
      // 스트라이크 개수 판단
      for (let i = 0; i < 3; i++) {
        if (this.#baseBallPolicy.isStrike(computer, user, i)) {
          this.#gameAsset.increaseStrikeCount();
        }
      }

      // 볼 개수 판단
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.#baseBallPolicy.isBall(computer, user, i, j)) {
            this.#gameAsset.increaseBallCount();
          }
        }
      }

      await Printer.print(
        `${this.#gameAsset.getBallCount()}볼 ${this.#gameAsset.getStrikeCount()}스트라이크`
      );
      if (this.#gameAsset.getStrikeCount() === 3) {
        await Printer.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');

        const reKeyword = await Reader.read(
          '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n'
        );

        if (this.#shouldRetry(reKeyword)) {
          this.play();
        } else {
          break;
        }
      }
    }
  }
}

export default App;
