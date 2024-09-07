import BaseBallPolicy from '../../model/BaseBallPolicy.js';
import Printer from '../utils/Printer.js';

export default class FinalResultOutputView {
  print = async () => {
    await Printer.print(
      `${BaseBallPolicy.GAME_NUMBER_LENGTH}개의 숫자를 모두 맞히셨습니다! 게임 종료`
    );
  };
}
