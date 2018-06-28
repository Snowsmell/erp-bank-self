import { isType } from '@/utils'

import {
  getProjectList,
  getProjectIndex
} from '@/api/order'

import {
  SET_CURRENT_PROJECT,
  SET_CURRENT_PROJECT_STATUS,
  SET_CURRENT_PROJECT_SUPPLIER,
  SET_PROJECT_SELECTED,
  SET_PROJECT_SELECTED_FALSE,
  SET_PROJECT_SEARCH,
  SET_PROJECT_LIST,
  SET_PROJECT_VENDERNAME
} from '../mutation-types'

/**
 * Bug:
 * 🐛 要去掉 supplierSelectedFalse，重写 supplierSelected
 */
const state = {
  projectList: [],
  currentProjectStatus: 0,
  currentProject: {},
  currentProjectSupplier: {},
  projectSelectedFalse: [],
  projectSelected: [],
  searchStatus: '',
  projectName: ''
}

const getters = {
  currentProjectCode: state => state.currentProject['project_code'] || ''
}

const mutations = {
  [SET_CURRENT_PROJECT] (state, project) {
    state.currentProject = project
  },
  [SET_CURRENT_PROJECT_STATUS] (state, status) {
    state.currentProjectStatus = status
  },
  [SET_CURRENT_PROJECT_SUPPLIER] (state, project) {
    state.currentProjectSupplier = project
  },
  [SET_PROJECT_SELECTED_FALSE](state, payload) {
    if (isType(payload) === 'object') {
      const { index, value } = payload
      state.projectSelectedFalse[index] = value
    } else {
      state.projectSelectedFalse = payload
    }
  },
  [SET_PROJECT_SELECTED](state) {
    state.projectSelected = JSON.parse(JSON.stringify(state.projectSelectedFalse))
  },
  [SET_PROJECT_SEARCH] (state, status) {
    state.searchStatus = status
  },
  [SET_PROJECT_LIST] (state, list) {
    state.projectList = list
  },
  [SET_PROJECT_VENDERNAME] (state, name) {
    state.projectName = name
  }
}

const actions = {
  async getProjectList({ state, getters, commit }, payload = {}) {
    let status = payload.status || state.currentProjectStatus
    let projectName = payload.projectName || state.projectName

    const res = await getProjectList(status, projectName)
    if (res.code === 0 && res.data.count > 0) {
      commit(SET_PROJECT_LIST, res.data.results)
      commit(SET_CURRENT_PROJECT, res.data.results[0])
    }
    return res
  },
  async getProjectSupplier({ state, getters, commit }, payload = {}) {
    let status = payload.status || state.currentProjectStatus
    let code = payload.code || getters.currentProjectCode
    const res = await getProjectIndex(status, code)
    if (res.code === 0) {
      commit(SET_CURRENT_PROJECT_SUPPLIER, res.data)
    }
    return res
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
