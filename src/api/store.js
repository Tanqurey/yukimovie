import {
  CURRENT_USER_KEY
} from 'common/js/config'
export const getUserFromCookie = () => {
  return window.$cookies.get(CURRENT_USER_KEY)
}
