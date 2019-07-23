import axios from 'axios'
import {
  registerUrl,
  checkNameUrl
} from 'common/js/config'

// 使用post方法进行用户注册
export function userRegister(user) {
  return axios.post(registerUrl, {
    params: {
      userName: user.userName,
      password: user.password,
      secureQuestion: user.secureQuestion,
      secureAnswer: user.secureAnswer,
    }
  })
}

export function checkUserName(userName) {
  return axios.get(checkNameUrl, {
    params: {
      userName: userName,
    }
  })
}

export function checkRegisterInfo(user, repeatPwd) {
  if (
    !user.userName ||
    !user.password ||
    !repeatPwd ||
    !user.secureQuestion ||
    !user.secureAnswer
  ) {
    return '信息填写不完整'
  } else if (
    user.userName.length < 3 ||
    user.userName.length > 12
  ) {
    return '用户名长度不符合要求'
  } else if (
    user.password.length < 6 ||
    user.password.length > 12
  ) {
    return '密码长度不符合要求'
  } else if (
    user.secureQuestion.length < 2 ||
    user.secureQuestion.length > 24
  ) {
    return '安全问题长度不符合要求'
  } else if (
    user.secureAnswer.length < 2 ||
    user.secureAnswer.length > 24
  ) {
    return '安全问题答案长度不符合要求'
  } else if (user.password !== repeatPwd) {
    return '两次输入密码不一致'
  }
  return false
}
