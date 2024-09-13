import BaseBallGame from '../src/model/BaseBallGame';

jest.mock('../src/model/BaseBallPolicy.js'); // BaseBallPolicy를 mock 처리

describe('BaseBallGame class tests', () => {
  let baseBallGame;
  let mockPolicy;

  beforeEach(() => {
    mockPolicy = new BaseBallPolicy();
    baseBallGame = new BaseBallGame();
  });
}