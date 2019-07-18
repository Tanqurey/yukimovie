export default class User {
  constructor({
    userName,
    password,
    createTime,
    lastLoginTime,
    secureQuestion,
    secureAnswer
  }) {
    this.userName = userName
    this.password = password
    this.secureQuestion = secureQuestion
    this.secureAnswer = secureAnswer
    this.createTime = createTime
    this.createTime = lastLoginTime
  }
}
