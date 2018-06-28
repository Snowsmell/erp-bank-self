import axios from 'axios'
import { Message } from 'element-ui'
import Store from '@/store'

// create an axios instance
const Service = axios.create({
  baseURL: process.env.BASE_API || '',
  timeout: 8000
})

// request interceptors
Service.interceptors.request.use(config => {
  const Token = Store.getters.token
  if (Token) {
    config.headers['Authorization'] = Token
    /* if (config.method === 'post') {
      config.headers['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlSWQiOjQsImlzcyI6InBpbmVhcHBsZSIsImlkIjo1MDQsInR5cGUiOjEsImV4cCI6MTUyNzg2MTg5NH0.-E3cgicfXg9wQzZcI9fF-6rvS53caMuPF4cWSbw2al0'
    } */
  }
  return config
}, error => {
  console.error(error)
  return Promise.reject(error)
})

// response interceptors
Service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 0) {
    // ❌ 弹窗提示：出错啦
    /**
     * code: 512 未登录，请先登录
     * code: 502 未授权
     */
    console.log(res.code)
    if (res.code === 502 || res.code === 512) {
      Store.dispatch('Logout').then(() => {
        window.location.href = '/'
      })
    }
    Message.error(res.message)
    return Promise.reject(res)
  }
  return res
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default Service
