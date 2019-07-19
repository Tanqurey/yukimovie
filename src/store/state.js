import {
  getUserFromCookie
} from 'api/store'

let currentUser = getUserFromCookie()
let isLogin = currentUser !== null

const state = {
  isLogin: isLogin,
  resetAccount: '',
  currentUser: currentUser
}

export default state
