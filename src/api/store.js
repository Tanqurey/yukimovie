import {
  CURRENT_USER_KEY
} from 'common/js/config'
import User from 'common/js/user'

export const getUserFromCookie = () => {
  let userStorage = window.$cookies.get(CURRENT_USER_KEY)
  if (userStorage) {
    return new User(userStorage)
  }
  return null
}
