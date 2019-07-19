import axios from 'axios'
import {
  localUrl
} from 'common/js/config'

const loginUrl = localUrl + 'user/login'
const secureQuestionUrl = localUrl + 'user/secureQuestion'
const checkAnswerUrl = localUrl + 'user/checkAnswer'
const resetPasswordUrl = localUrl + 'user/resetPassword'

// 使用post方法进行用户登录
export function userLogin(userName, password) {
  return axios.post(loginUrl, {
    params: {
      userName: userName,
      password: password,
    }
  })
}

export function getSecureQuestion(userName) {
  return axios.get(secureQuestionUrl, {
    params: {
      userName: userName
    }
  })
}

export function checkAnswer(userName, secureAnswer) {
  return axios.post(checkAnswerUrl, {
    params: {
      userName: userName,
      secureAnswer: secureAnswer
    }
  })
}

export function resetPassword(userName, newPassword) {
  return axios.post(resetPasswordUrl, {
    params: {
      userName: userName,
      newPassword: newPassword
    }
  })
}
