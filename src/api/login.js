import axios from 'axios'
import {
  localUrl
} from 'common/js/config'

const loginUrl = localUrl + 'user/login'
const secureQuestionUrl = localUrl + 'user/secureQuestion'

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
