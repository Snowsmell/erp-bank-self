import request from '@/utils/request'
import HOST from './host'
const SERVER = `${HOST}/erp-bank-service/api/v1`
const SERVER1 = `${HOST}/erp-contract-service/api/v1`

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
 * @param {[JSON]} reqVo  参数
 */
export function getTransactionList(data) {
  return request({
    url: `${SERVER1}/transactions/`,
    method: 'post',
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
