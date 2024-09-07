import Printer from '../utils/Printer.js';

export default class RoundResultOutputView {
  print = async (ballAndStrikeCount) => {
    await Printer.print(
      `${ballAndStrikeCount.getBallCount()}볼 ${ballAndStrikeCount.getStrikeCount()}스트라이크`
    );
  };
}
