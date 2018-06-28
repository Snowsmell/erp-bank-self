import { loginBySMS } from '@/api/user'
import { 
  getToken, setToken, removeToken,
  getRole, setRole, removeRole,
  getProfile, setProfile, removeProfile
} from '@/utils/auth'

import {
  USER_LOGIN,
  USER_LOGOUT
} from '../mutation-types'

const state = {
  token: getToken(),
  roleId: getRole(),
  profile: getProfile() || {}
}

const getters = {}

const mutations = {
  [USER_LOGIN] (state, user) {
    const { token, role_id, avatar, name, user_name } = user
    const profile = {
      avatar,
      name,
      username: user_name
    }

    state.token = token
    state.roleId = role_id
    state.profile = profile
    setToken(token)
    setRole(role_id)
    setProfile(profile)
  },
  [USER_LOGOUT] (state) {
    state.token = null
    state.roleId = null
    state.profile = {}
    removeToken()
    removeRole()
    removeProfile()
  }
}

const actions = {
  async LoginBySMS({ commit }, userInfo) {
    const { username, password, sms } = userInfo
    let user = await loginBySMS(username, password, sms)
    if (user.data && user.data.token) {
      commit(USER_LOGIN, user.data)
    }
    return user
  },
  Logout({ commit, state }) {
    return new Promise(resolve => {
      commit(USER_LOGOUT)
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
