import * as types from './mutation-types'
const mutations = {
  [types.SET_LOGIN_STATUS](state, flag) {
    state.isLogin = flag
  }
}

export default mutations
