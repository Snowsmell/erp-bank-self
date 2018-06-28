// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'normalize.css'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/app.scss'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import * as filters from '@/filters'

import '../static/Ueditor/ueditor.config.js'
import '../static/Ueditor/ueditor.all.min.js'
import '../static/Ueditor/lang/zh-cn/zh-cn.js'
import '../static/Ueditor/ueditor.parse.min.js'

Vue.use(ElementUI)

Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

