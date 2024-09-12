import BaseBallPolicy from '../src/model/BaseBallPolicy.js';

describe('BaseBallPolicy 테스트', () => {
  let baseBallPolicy;

  beforeEach(() => {
    baseBallPolicy = new BaseBallPolicy();
  });

  test('랜덤 숫자 생성 테스트', () => {
    const randomNumbers = baseBallPolicy.generateRandomNumbers();

    expect(randomNumbers).toHaveLength(BaseBallPolicy.GAME_NUMBER_LENGTH);
    expect(
      randomNumbers.every(
        (num) =>
          num >= BaseBallPolicy.MIN_NUMBER && num <= BaseBallPolicy.MAX_NUMBER
      )
    ).toBe(true);
    expect(new Set(randomNumbers).size).toBe(randomNumbers.length);
  });

  test('스트라이크일 때 true를 반환하는 지 테스트', () => {
    const computer = [1, 2, 3];
    const userNumber = 2;
    const index = 1;
    expect(baseBallPolicy.isStrike(computer, userNumber, index)).toBe(true);
  });

  test('볼일 때 true를 반환하는 지 테스트', () => {
    const computer = [1, 2, 3];
    const user = [1, 4, 3];
    const index = 1;
    const comNumber = 4;
    expect(baseBallPolicy.isBall(computer, user, index, comNumber)).toBe(true);
  });

  test('userNumbers 길이가 3인지 테스트', () => {
    const input = [1, 2];
    expect(() => baseBallPolicy.validateUserNumbers(input)).toThrow(
      `[ERROR] 입력한 숫자는 반드시 ${BaseBallPolicy.GAME_NUMBER_LENGTH}자리여야 합니다.`
    );
  });

  test('userNumbers 중복된 숫자 테스트', () => {
    const input = [1, 1, 2];
    expect(() => baseBallPolicy.validateUserNumbers(input)).toThrow(
      '[ERROR] 입력한 숫자에 중복된 숫자가 있습니다.'
    );
  });

  test('userNumbers 제대로 입력될 때 테스트', () => {
    const input = [1, 2, 3];
    expect(() => baseBallPolicy.validateUserNumbers(input)).not.toThrow();
  });
});
