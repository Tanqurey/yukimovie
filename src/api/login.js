import axios from 'axios'
import {
  loginUrl,
  secureQuestionUrl,
  resetPasswordUrl,
  checkAnswerUrl
} from 'common/js/config'

// 使用post方法进行用户登录
export function userLogin(userName, password, isQuickLogin) {
  return axios.post(loginUrl, {
    params: {
      userName: userName,
      password: password,
      isQuickLogin: isQuickLogin || false
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
