import Reader from '../utils/Reader.js';

export default class NumbersInputView {
  read = async () => {
    const input = await Reader.readNumbers('숫자를 입력해주세요 : ');
    return input;
  };
}
