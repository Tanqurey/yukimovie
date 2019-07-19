import * as types from './mutation-types'
const mutations = {
  [types.SET_LOGIN_STATUS](state, flag) {
    state.isLogin = flag
  },
  [types.SET_RESET_ACCOUNT](state, userName) {
    state.resetAccount = userName
  },
  [types.SET_CURRENT_USER](state, userName) {
    state.currentUser = userName
  }
}

export default mutations
