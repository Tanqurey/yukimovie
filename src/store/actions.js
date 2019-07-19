//  处理异步请求或者是完成多个mutations操作

import * as types from './mutation-types'
import {
  CURRENT_USER_KEY,
  CURRENT_USER_EXPIRES_TIME
} from 'common/js/config'

export const onLine = function ({
  commit,
  state
}, {
  userName
}) {
  commit(types.SET_LOGIN_STATUS, true)
  commit(types.SET_CURRENT_USER, userName)
  window.$cookies.set(
    CURRENT_USER_KEY,
    userName,
    CURRENT_USER_EXPIRES_TIME
  )
}

export const offLine = function ({
  commit,
  state
}, {
  userName
}) {
  commit(types.SET_LOGIN_STATUS, false)
  commit(types.SET_CURRENT_USER, '')
  window.$cookies.remove(
    CURRENT_USER_KEY,
  )
}
