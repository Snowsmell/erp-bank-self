import { isType } from '@/utils'

import {
  launchPayRequest,
  getRequestList,
  getPayLaunchList,
  newGetDeliveryDetail,
  getRequestedList
} from '@/api/order'

import {
  SET_DATA_LIST,
  SET_SELECT_LIST,
  SET_NOW_PAGE
} from '../mutation-types'

const state = {
  dataList: [],
  selectedList: [],
  total: '',
  nowPage: 1
}

const getters = {
  commonAmount: (state) => {
    let sum = 0
    state.selectedList.forEach(v => {
      if (v.order_amount) {
        sum += v.order_amount
      } else {
        sum += v.amount
      }      
    })
    return sum
  },
  selectedDeliveriesId: (state) => {
    return state.selectedList.map(v => {
      return v.delivery_id
    })
  }
}

const mutations = {
  [SET_DATA_LIST] (state, list) {
    state.dataList = list.results
    state.total = list.count
  },
  [SET_SELECT_LIST](state, list) {
    state.selectedList = list.slice()
  },
  [SET_NOW_PAGE](state, page) {
    state.nowPage = page
  }
}

const actions = {
  // v1.2 申请付款 
  async launchPayRequest({state, commit}, arrList) {
    arrList = state.selectedList.map(v => {
      return v.delivery_id
    })
    const data = {
      'deliveries': arrList
    }
    const res = await launchPayRequest(data)
    state.selectedList = []
  },
  // v1.2 付款申请单 列表
  async getRequestList({state, commit}, param) {
    const res = await getRequestList(param)
    if (res.code === 0) {
      commit(SET_DATA_LIST, res.data)
    }
  },
  // v1.2获取提单(业务员申请付款)列表
  async getPayLaunchList({state, commit}, param) {
    const res = await getPayLaunchList(param)
    if (res.code === 0) {
      commit(SET_DATA_LIST, res.data)
    }
  },
  // v1.2 获取我发起的（业务员获取）
  async getRequestedList({state, commit}, param) {
    const res = await getRequestedList(param)
    if (res.code === 0) {
      commit(SET_DATA_LIST, res.data)
    }
  },
  // v1.2通用列表页，设置选中的内容
  setselectlist({commit, state}, list = []) {
    commit(SET_SELECT_LIST, list)
  }



}

export default {
  state,
  getters,
  mutations,
  actions
}
