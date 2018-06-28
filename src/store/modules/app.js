import {
  SET_LOADING
} from '../mutation-types'

const state = {
  loading: false
}

const mutations = {
  [SET_LOADING] (state, payload) {
    state.loading = payload
  }
}

export default {
  state,
  mutations
}
