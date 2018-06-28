import {
  getRepayList,
  getRepayDetail,
  getRepayBank
} from '@/api/order'

import {
  SET_REPAY_LOAN_SELECTED,
  SET_REPAY_BANK_INDEX,
  SET_REPAY_SUPPLIER,
  SET_REPAY_SUPPLIER_LIST,
  SET_REPAY_SUPPLIER_LOAN,
  SET_REPAY_SUPPLIER_BANK,
  SET_REPAY_CODE,
  SET_REPAY_SEARCH,
  SET_REPAY_VENDORNAME
} from '../mutation-types'

const state = {
  repayLoanSelected: [],
  repayBankIndex: -1,
  repaySupplierList: [],
  repaySupplier: {},
  repayLoanList: {},
  repayBankList: {},
  repayCode: '',
  vendorName: '',
  searchStatus: ''
}

const getters = {
  repaySupplierCode: state => state.repaySupplier['vendor_code']
}

const mutations = {
  [SET_REPAY_LOAN_SELECTED](state, list) {
    state.repayLoanSelected = list
  },
  [SET_REPAY_BANK_INDEX](state, num) {
    state.repayBankIndex = Number(num)
  },
  [SET_REPAY_SUPPLIER](state, supplier) {
    state.repaySupplier = supplier
  },
  [SET_REPAY_SUPPLIER_LIST](state, list) {
    state.repaySupplierList = list
  },
  [SET_REPAY_SUPPLIER_LOAN](state, list) {
    state.repayLoanList = list
  },
  [SET_REPAY_SUPPLIER_BANK](state, list) {
    state.repayBankList = list
  },
  [SET_REPAY_CODE](state, code) {
    state.repayCode = code
  },
  [SET_REPAY_SEARCH] (state, search) {
    state.searchStatus = search
  },
  [SET_REPAY_VENDORNAME] (state, name) {
    state.vendorName = name
  }
}

const actions = {
  async getRepaySupplier({ getters, commit }, payload = {}) {
    let vendorName = payload.vendorName || state.vendorName
    const res = await getRepayList(vendorName)
    if (res.code === 0 && res.data.count > 0) {
      const data = res.data.results
      commit(SET_REPAY_SUPPLIER_LIST, data)

      // 如果不存在当前 还款供应商信息，则默认第一个
      if (!getters.repaySupplierCode) {
        commit(SET_REPAY_SUPPLIER, data[0])
      }
    }
    return res
  },
  async getRepayLoan({ getters, commit }, code, page) {
    code = code || getters.repaySupplierCode
    if (code instanceof Object) {
      page = code.page
      code = code.code
    }
    commit(SET_REPAY_CODE, code)
    const res = await getRepayDetail(code, page)
    if (res.code === 0) {
      commit(SET_REPAY_SUPPLIER_LOAN, res.data)
    }
    return res
  },
  async getRepayBank({ commit }) {
    const res = await getRepayBank()
    if (res.code === 0) {
      commit(SET_REPAY_SUPPLIER_BANK, res.data)
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
