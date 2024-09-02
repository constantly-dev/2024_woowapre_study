export default class BaseBallPolicy {
  isStrike(computer, user, index) {
    return computer[index] === user[index];
  }

  isBall(computer, user, i, j) {
    return computer[i] === user[j] && i !== j;
  }
}
