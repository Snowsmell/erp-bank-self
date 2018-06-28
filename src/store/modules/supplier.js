import { isType } from '@/utils'

import {
  getSupplierList,
  getSupplierDetail
} from '@/api/order'

import {
  SET_CURRENT_SUPPLIER,
  SET_CURRENT_SUPPLIER_STATUS,
  SET_CURRENT_SUPPLIER_DETAIL,
  SET_SUPPLIER_SELECTED,
  SET_SUPPLIER_SELECTED_FALSE,
  SET_SUPPLIER_SEARCH,
  SET_SUPPLIER_VENDERNAME,
  SET_SUPPLIER_LIST
} from '../mutation-types'

/**
 * Bug:
 * 🐛 要去掉 supplierSelectedFalse，重写 supplierSelected
 */
const state = {
  supplierList: [],
  currentSupplierStatus: 0,
  currentSupplier: {},
  currentSupplierDetail: {},
  supplierSelectedFalse: [],
  supplierSelected: [],
  searchStatus: '',
  vendorName: ''
}

const getters = {
  currentSupplierCode: state => state.currentSupplier['vendor_code'] || '',
  currentSupplierName: state => state.currentSupplier['vendor_name'],
  currentSupplierProject: state => state.currentSupplierDetail['projects'] || [],
  currentSupplierCredit: state => state.currentSupplierDetail['credit'] || 0
}

const mutations = {
  [SET_CURRENT_SUPPLIER] (state, supplier) {
    state.currentSupplier = supplier
  },
  [SET_CURRENT_SUPPLIER_STATUS] (state, status) {
    state.currentSupplierStatus = status
  },
  [SET_CURRENT_SUPPLIER_DETAIL] (state, supplier) {
    state.currentSupplierDetail = supplier
  },
  [SET_SUPPLIER_SELECTED_FALSE] (state, payload) {
    if (isType(payload) === 'object') {
      // console.log('object', payload)
      const { index, value } = payload
      state.supplierSelectedFalse[index] = value
    } else {
      state.supplierSelectedFalse = payload
    }
  },
  [SET_SUPPLIER_SELECTED] (state) {
    state.supplierSelected = JSON.parse(JSON.stringify(state.supplierSelectedFalse))
  },
  [SET_SUPPLIER_SEARCH] (state, status) {
    state.searchStatus = status
  },
  [SET_SUPPLIER_VENDERNAME] (state, name) {
    state.vendorName = name
  },
  [SET_SUPPLIER_LIST] (state, list) {
    state.supplierList = list
  }
}

const actions = {
  // 获取 供应商 列表
  async getSupplierList({ state, getters, commit }, payload = {}) { 
    let status = payload.status || state.currentSupplierStatus
    let vendorName = payload.vendorName || state.vendorName

    const res = await getSupplierList(status, vendorName) 
    if (res.code === 0 && res.data.count > 0) {  
      commit(SET_SUPPLIER_LIST, res.data.results)
      commit(SET_CURRENT_SUPPLIER, res.data.results[0])
    }
    return res
  },
  // 获取 供应商 详情
  async getSupplierDetail({ state, getters, commit }, payload = {}) {
    let status = payload.status || state.currentSupplierStatus
    let code = payload.code || getters.currentSupplierCode

    const res = await getSupplierDetail(status, code)
    if (res.code === 0) {
      commit(SET_CURRENT_SUPPLIER_DETAIL, res.data)
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
