//  处理异步请求或者是完成多个mutations操作

import * as types from './mutation-types'
import {
  CURRENT_USER_KEY,
  CURRENT_USER_EXPIRES_TIME
} from 'common/js/config'
import User from 'common/js/user'

export const onLine = function ({
    commit,
    state
  },
  user
) {
  let currentUser = new User(user)
  commit(types.SET_CURRENT_USER, currentUser)
  window.$cookies.set(
    CURRENT_USER_KEY,
    currentUser.userName,
    CURRENT_USER_EXPIRES_TIME
  )
}

export const offLine = function ({
  commit,
  state
}) {
  commit(types.SET_CURRENT_USER, null)
  window.$cookies.remove(
    CURRENT_USER_KEY
  )
}
