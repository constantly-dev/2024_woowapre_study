export default class GameRoundResponse {
  #ballCount;
  #strikeCount;

  constructor(ball = 0, strike = 0) {
    this.#ballCount = ball;
    this.#strikeCount = strike;
  }

  getBallCount = () => {
    return this.#ballCount;
  };

  getStrikeCount = () => {
    return this.#strikeCount;
  };
}
