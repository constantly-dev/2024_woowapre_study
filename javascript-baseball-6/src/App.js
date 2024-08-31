import { Console, Random } from '@woowacourse/mission-utils';

class App {
  validateInput(input) {
    // 숫자가 아닌 경우
    if (!/^\d+$/.test(input)) {
      throw new Error('입력한 값이 숫자가 아닙니다.');
    }

    // 숫자이지만 3자리가 아닌 경우
    if (input.length !== 3) {
      throw new Error('입력한 숫자는 반드시 3자리여야 합니다.');
    }

    // 숫자이고 3자리지만 중복된 숫자가 있는 경우
    const digits = input.split('');
    const uniqueDigits = new Set(digits);
    if (uniqueDigits.size !== 3) {
      throw new Error('입력한 숫자에 중복된 숫자가 있습니다.');
    }
  }

  async play() {
    await Console.print('숫자 야구 게임을 시작합니다.');
    // 컴퓨터가 제공하는 랜덤 숫자 3자리 얻기
    const computer = [];
    while (computer.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    console.log(computer);

    // 3스트라이크까지 반복 {

    let ball;
    let strike;

    while (strike !== 3) {
      ball = 0;
      strike = 0;

      // 유저가 3자리 입력
      const input = await Console.readLineAsync('숫자를 입력해주세요 : ');

      /* 예외처리
      1.숫자가 아닌경우
      2.숫자인데 3자리가 아닌경우
      3.숫자이고 3자리인데 3개가 겹치는 숫자가 있는 경우
      */

      try {
        this.validateInput(input);
      } catch (error) {
        Console.print(error.message);
        break;
      }

      const user = input.split('').map(Number);

      // 컴퓨터 랜덤 숫자와 유저 입력 숫자를 비교
      // 스트라이크 개수 판단
      for (let i = 0; i < 3; i++) {
        if (computer[i] === user[i]) {
          strike++;
        }
      }

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (computer[i] === user[j] && i !== j) {
            ball++;
          }
        }
      }

      console.log(`${ball}볼 ${strike}스트라이크`);
      if (strike === 3) {
        console.log('3개의 숫자를 모두 맞히셨습니다! 게임 종료');

        const reKeyword = await Console.readLineAsync(
          '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n'
        );

        if (reKeyword === '1') {
          this.play();
        } else if (reKeyword === '2') {
          break;
        }
      }
    }
  }
}

export default App;
