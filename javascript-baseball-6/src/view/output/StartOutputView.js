import Printer from '../utils/Printer.js';

export default class StartOutputView {
  print = async () => {
    await Printer.print('숫자 야구 게임을 시작합니다.');
  };
}
