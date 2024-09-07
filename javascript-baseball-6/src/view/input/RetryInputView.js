import Reader from '../utils/Reader.js';

export default class RetryInputView {
  read = async () => {
    const input = await Reader.read(
      '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n'
    );
    return input;
  };
}
