import Router from '@/router'
import {
  searchpays,
  exportData,
  getTransactionList
} from '@/api/parameter'

import {
  SET_PARAM_LIST,
  SET_PARAM_SEARCH_PRONAME,
  SET_PARAM_SEARCH_SELLERNAME,
  SET_PARAM_SEARCH_DEBETNO,
  SET_PARAM_SEARCH_VOUCHERNO,
  SET_PARAM_SEARCH_TIME,
  SET_PARAM_PAGE_SIZE,
  SET_PARAM_CURRENTPAGE,
  SET_TRANSACTIONS
} from '../mutation-types'

const state = {
  parameterList: [],
  searchProName: null,
  searchSellerName: null,
  searchDebetNo: null,
  searchVoucherNo: null,
  timeInterval: [],
  pageSize: {},
  currentPage: 1,
  transactions: {}
}

const getters = {
  param_size: state => state.pageSize['page_size'] || 12,
  param_total: state => state.pageSize['total'] || 1,
  transactionList: state => state.transactions['list'] || [],
  transactionTotal: state => state.transactions['total'] || 0
}

const mutations = {
  [SET_PARAM_LIST] (state, list) {
    state.parameterList = list
  },
  [SET_PARAM_SEARCH_PRONAME] (state, string) {
    state.searchProName = string
  },
  [SET_PARAM_SEARCH_SELLERNAME] (state, string) {
    state.searchSellerName = string
  },
  [SET_PARAM_SEARCH_DEBETNO] (state, string) {
    state.searchDebetNo = string
  },
  [SET_PARAM_SEARCH_VOUCHERNO] (state, string) {
    state.searchVoucherNo = string
  },
  [SET_PARAM_SEARCH_TIME] (state, arr) {
    if (arr === null) {
      state.timeInterval = []
      return
    }
    state.timeInterval = arr
  },
  [SET_PARAM_PAGE_SIZE] (state, obj) {
    state.pageSize = obj
  },
  [SET_PARAM_CURRENTPAGE] (state, page) {
    state.currentPage = page
  },
  [SET_TRANSACTIONS](state, data) {
    state.transactions = data
  }
}

const actions = {
  /**
   * 查询还款记录 列表
   * 
   * @param {[JSON]} reqJson 翻页请求数据
   * */ 

  async onlinepay({ commit }, reqJson) {
    let res = await searchpays(reqJson)
    if (res.code === 0 && res.data.list.length > 0) {
      commit(SET_PARAM_LIST, res.data.list)
      commit(SET_PARAM_PAGE_SIZE, res.data)
      commit(SET_PARAM_SEARCH_TIME, [])
    } else {
      commit(SET_PARAM_LIST, [])
      commit(SET_PARAM_SEARCH_TIME, [])
    }
  },

  /**
   * 导出还款记录 列表
   * 
   * @param {[JSON]} reqJson 数据
   * */ 
  async exportData({ commit }, reqJson) {
    let res = await exportData(reqJson)
    const fileName = '还款记录.xls'
    if (res.code === 0) {
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = res.data
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    }
  },
  async getTransactions({ state, commit }, payload) {
    const condition = Object.assign({
      page_size: 10
    }, payload)
    const res = await getTransactionList(condition)
    commit(SET_TRANSACTIONS, res.data)
    return res
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}
