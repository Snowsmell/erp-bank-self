import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import supplier from './modules/supplier'
import project from './modules/project'
import order from './modules/order'
import repay from './modules/repay'
import contract from './modules/contract'
import parameter from './modules/parameter'
import common from './modules/commonList'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    supplier,
    project,
    order,
    repay,
    contract,
    parameter,
    common
  },
  getters,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
