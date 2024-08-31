export default class GameAsset {
  #ballCount;
  #strikeCount;

  constructor() {
    this.init();
  }

  getBallCount = () => {
    return this.#ballCount;
  };

  getStrikeCount = () => {
    return this.#strikeCount;
  };

  increaseBallCount = () => {
    this.#ballCount++;
  };

  increaseStrikeCount = () => {
    this.#strikeCount++;
  };

  init = () => {
    this.#ballCount = 0;
    this.#strikeCount = 0;
  };
}
