import request from '@/utils/request'
import { apiURL } from './config'
const SERVER = apiURL('erp-bank-service')
const SERVER1 = apiURL('erp-contract-service')

/**
 * 查询还款记录 列表
 * 
 * @param {[JSON]} data 翻页请求数据
 * */ 
export function searchpays(data) {
  return request({
    url: `${SERVER}/onlinepay/searchpays/`,
    method: 'POSt',
    data
  })
}

/**
 * 导出还款记录 列表
 * 
 * @param {[JSON]} data 翻页请求数据
 * */ 
export function exportData(data) {
  return request({
    url: `${SERVER}/onlinepay/export/`,
    method: 'POSt',
    data
  })
}

/**
 * 超级台账分页列表
 * 
 * @param {[JSON]} reqVo  后台接受参数命名为reqVo 
 */
export function getTransactionList(data) {
  return request({
    url: `${SERVER1}/transactions/`,
    method: 'POST',
    data
  })
}

/**
 * 新增/修改 transaction
 * @param {[Object]} data 参数
 */
export function postTransaction(data) {
  return request({
    url: `${SERVER1}/transaction/`,
    method: 'post',
    data
  })
}
/**
 * 删除 transaction
 * 
 * @param {[Number]} id transaction Id
 */
export function deleteTransaction(id) {
  return request({
    url: `${SERVER1}/transaction/${id}/`,
    method: 'delete'
  })
}
