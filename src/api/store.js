import {
  CURRENT_USER_KEY
} from 'common/js/config'
import {
  userLogin
} from 'api/login'
import User from 'common/js/user'

export const getUserFromCookie = (cb) => {
  let userName = window.$cookies.get(CURRENT_USER_KEY)
  if (userName) {
    userLogin(userName, '', true).then(result => {
      if (result.data.code === 200) {
        cb(result.data.currentUser === null ? null : new User(result.data.currentUser))
      } else {
        window.$cookies.remove(
          CURRENT_USER_KEY
        )
        cb(null)
      }
    })
  } else {
    cb(null)
  }
}