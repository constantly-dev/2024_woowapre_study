import Printer from './Printer.js';
import Reader from './Reader.js';
import BaseBallPolicy from './BaseBallPolicy.js';
import BaseBallGame from './BaseBallGame.js';

class App {
  #baseBallGame;
  #isGameEnd;

  constructor() {
    this.#baseBallGame = new BaseBallGame();
    this.#isGameEnd = false;
  }

  async play() {
    await this.#processBeforeGame();

    while (!this.#isGameEnd) {
      const user = await this.#readUserInput();

      const ballAndStrikeCount =
        await this.#baseBallGame.processRoundResult(user);

      await this.#printRoundResult(ballAndStrikeCount);
      this.#updateIsGameEnd(ballAndStrikeCount);
      this.#processAfterRound();
    }
  }

  async #processBeforeGame() {
    await this.#printGameStart();

    this.#baseBallGame.startGame();
    this.#isGameEnd = false;
  }

  async #processAfterRound() {
    if (this.#isGameEnd) {
      await this.#printFinalResult();
      const reKeyword = await this.#readRetry();

      if (this.#shouldRetry(reKeyword)) {
        this.#baseBallGame.restartGame();
        this.#isGameEnd = false;
      }
    }
  }

  #printGameStart = async () => {
    await Printer.print('숫자 야구 게임을 시작합니다.');
  };

  #readUserInput = async () => {
    const input = await Reader.read('숫자를 입력해주세요 : ');
    this.#baseBallGame.processValidateNumbers(input);
    return input.split('').map(Number);
  };

  #printRoundResult = async (ballAndStrikeCount) => {
    await Printer.print(
      `${ballAndStrikeCount.getBallCount()}볼 ${ballAndStrikeCount.getStrikeCount()}스트라이크`
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
    this.#baseBallGame.processValidateRetry(reKeyword);
    return reKeyword;
  };

  #updateIsGameEnd = async (ballAndStrikeCount) => {
    this.#isGameEnd = this.#baseBallGame.processGameEnd(ballAndStrikeCount);
  };

  #shouldRetry = (reKeyword) => {
    if (reKeyword === '1') {
      return true;
    }
    return false;
  };
}

export default App;
