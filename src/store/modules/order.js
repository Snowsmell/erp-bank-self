import Router from '@/router'
import * as API from '@/api/order'
import {
  SET_CURRENT_PAYMENT,
  SET_ORDER_URL_QUERY,
  SET_APPROVAL_STATUS,
  SET_PAYMENT_LIST,
  SET_PAYMENT_APPLICANT,
  SET_PAYMENT_VENDORNAME,
  SET_PAYMENT_SEARCHSTATUS,
  SET_PAYMENT,
  SET_PAYMENT_STATUS,
  SET_PAYMENT_SELECTED,
  SET_ORDER_ISSHOW
} from '../mutation-types'

const state = {
  paymentSelected: [],
  orderUrlQuery: {},
  currentPayment: {},
  paymentList: [],
  approvalStatus: 1,
  paymentStatus: 0,
  applicant: '',
  searchStatus: '',
  payment: '',
  status: '',
  vendorName: '',
  isShown: true
}

const getters = {
  paymentCode: state => state.currentPayment['request_code'] || '',
  paymentAmount: state => state.currentPayment['amount'] || 0,
  paymentTransferAmount: state => {
    let amount = 0
    state.paymentSelected.map(item => {
      amount += state.paymentList[item]['amount']
    })
    return amount
  }
}

const mutations = {
  [SET_PAYMENT_SELECTED](state, index) {
    if (index instanceof Array) {
      state.paymentSelected = index
    } else {
      const arr = state.paymentSelected
      if (arr.indexOf(index) !== -1) {
        state.paymentSelected.splice(arr.indexOf(index), 1)
      } else {
        state.paymentSelected.push(index)
      }
    }
  },
  [SET_CURRENT_PAYMENT](state, payment) {
    state.currentPayment = payment
  },
  [SET_ORDER_URL_QUERY] (state, query) {
    state.orderUrlQuery = query
  },
  [SET_PAYMENT_LIST](state, list) {
    state.paymentList = list
  },
  [SET_APPROVAL_STATUS] (state, status) {
    state.approvalStatus = status
  },
  [SET_PAYMENT_APPLICANT] (state, name) {
    state.applicant = name
  },
  [SET_PAYMENT_VENDORNAME] (state, vendorName) {
    state.vendorName = vendorName
  },
  [SET_PAYMENT_SEARCHSTATUS] (state, searchStatus) {
    state.searchStatus = searchStatus
  },
  [SET_PAYMENT] (state, payment) {
    state.payment = payment
  },
  [SET_PAYMENT_STATUS] (state, status) {
    state.status = status
  },
  [SET_ORDER_ISSHOW] (state, show) {
    state.isShown = show
  }
}

const actions = {
  /**
   * 获取付款申请单列表
   * 
   * @param {[string]} payment 调用付款申请单列表API
   * @param {[status]} status 状态
   */
  async getPaymentList({ commit }, payload = {}) {
    const payment = payload.payment || state.payment
    const status = payload.status || state.status
    const vendorName = payload.vendorName || state.vendorName
    
    const res = await API[payment](status, vendorName)
    if (res.code === 0) {
      const data = res.data
      if (data.count > 0) {
        commit(SET_PAYMENT_LIST, data.results)
        const first = data.results[0]
        // commit(SET_CURRENT_PAYMENT, first)
        // 设置默认 付款申请单id
        // Router.replace({
        //   query: {
        //     payId: first['pay_request_id'],
        //     vendorCode: first['vendor_code']
        //     // deliveryId: 5412
        //   }
        // })
      } else {
        // commit(SET_CURRENT_PAYMENT, {})
        commit(SET_PAYMENT_LIST, [])
      }
    }
    return res
  },

  /**
   * v1.2设置当前详情页amount
   * 
   * @param {[Object]} data 当前单的详情
   */

  newSetCurrentAmount({commit, state}, data) {
    commit(SET_CURRENT_PAYMENT, data)
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
