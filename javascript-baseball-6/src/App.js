import UserRetryValidator from './UserRetryValidator.js';
import Printer from './Printer.js';
import Reader from './Reader.js';
import GameAsset from './GameAsset.js';
import BaseBallPolicy from './BaseBallPolicy.js';

class App {
  #userRetryValidator;
  #gameAsset;
  #baseBallPolicy;
  #computer;

  constructor() {
    this.#userRetryValidator = new UserRetryValidator();
    this.#gameAsset = new GameAsset();
    this.#baseBallPolicy = new BaseBallPolicy();
    this.#computer = null;
  }

  #shouldRetry = (reKeyword) => {
    if (reKeyword === '1') {
      return true;
    }
    return false;
  };

  async play() {
    await this.#printGameStart();
    await this.#init();

    while (!this.#isGameEnd()) {
      this.#initGameAsset();
      const user = await this.#readUserInput();

      this.#processStrike(user);
      this.#processBall(user);

      await this.#printRoundResult();

      if (this.#isGameEnd()) {
        await this.#printFinalResult();
        const reKeyword = await this.#readRetry();

        if (this.#shouldRetry(reKeyword)) {
          this.play();
        }
        break;
      }
    }
  }
  #init = async () => {
    this.#initGameAsset();
    await this.#initComputerNumbers();
  };

  // 이후 게임에서 다른 gameAsset과 관련없는 초기화 로직을 추가할 경우,
  // 확장성을 고려해 다시 메서드로 감싼다.
  #initGameAsset = async () => {
    this.#gameAsset.init();
  };

  #initComputerNumbers = async () => {
    this.#computer = this.#baseBallPolicy.generateRandomNumbers();
  };

  #printGameStart = async () => {
    await Printer.print('숫자 야구 게임을 시작합니다.');
  };

  #readUserInput = async () => {
    const input = await Reader.read('숫자를 입력해주세요 : ');
    this.#baseBallPolicy.validateUserNumbers(input);
    return input.split('').map(Number);
  };

  #printRoundResult = async () => {
    await Printer.print(
      `${this.#gameAsset.getBallCount()}볼 ${this.#gameAsset.getStrikeCount()}스트라이크`
    );
  };

  #printFinalResult = async () => {
    await Printer.print(
      `${BaseBallPolicy.GAME_NUMBER_LENGTH}개의 숫자를 모두 맞히셨습니다! 게임 종료`
    );
  };

  #readRetry = async () => {
    const reKeyword = await Reader.read(
      '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n'
    );
    this.#userRetryValidator.validate(reKeyword);
    return reKeyword;
  };

  #processStrike = (user) => {
    const strikeCount = this.#baseBallPolicy.calculateStrikeCount(
      this.#computer,
      user
    );
    for (let i = 0; i < strikeCount; i++) {
      this.#gameAsset.increaseStrikeCount();
    }
  };

  #processBall = (user) => {
    const ballCount = this.#baseBallPolicy.calculateBallCount(
      this.#computer,
      user
    );
    for (let i = 0; i < ballCount; i++) {
      this.#gameAsset.increaseBallCount();
    }
  };

  #isGameEnd = () => {
    return this.#baseBallPolicy.isGameEnd(this.#gameAsset);
  };
}

export default App;
