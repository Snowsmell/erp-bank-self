import request from '@/utils/request'
import HOST from './host'
const SERVER = `${HOST}/erp-bank-service/api/v1`
const SERVER1 = `${HOST}/erp-contract-service/api/v1`
const SERVER2 = `${HOST}/api/v1`

/** 用印项目合同
 **********************************************************************/
/**
 * 项目银行合同确认
 * @param {[number]} id  项目合同id
 * @param {[string]} status  项目合同状态
 */
export function auditSeal(id, status) {
  return request({
    url: `${SERVER}/auditSeal`,
    method: 'POSt',
    params: {
      id,
      status
    }
  })
}

/**
 * 项目合同归档下载
 * @param {[number]} id  项目合同id
 */
export function downloadSeal(id) {
  return request({
    url: `${SERVER}/downloadSeal`,
    method: 'POSt',
    params: {
      id
    }
  })
}

/**
 * 项目合同主体保存、提交接口
 * @param {[Object]} data  项目合同数据
 */
export function uploadSeal(data) {
  return request({
    url: `${SERVER}/uploadSeal`,
    method: 'POSt',
    data
  })
}

/**
 * 获取项目列表
 * @param {[JSON]} data  项目名
 */
export function getContractList(data) {
  return request({
    url: `${SERVER}/contract/plist/`,
    method: 'POST',
    data
  })
}

/**
 * 获取采购合同列表
 * @param {[JSON]} data  项目名
 */
export function getProcurementList(data) {
  return request({
    url: `${SERVER}/contract/clist/`,
    method: 'POST',
    data
  })
}


/**
 * 项目合同信息、文件上传
 * @param {[JSON]} data  项目合同名
 */
export function saveContractImg(data) {
  return request({
    url: `${SERVER1}/contpl/saveSeal`,
    method: 'POST',
    data
  })
}

/**
 * 立项资料 返显
 * @param {[String]} projectNo  项目合同编号
 * @param {[String]} contractType  合同类型
 * @param {[String]} contractType  采购合同编号
 */
export function backShowImg(projectNo, contractType, contractCode) {
  return request({
    url: `${SERVER1}/findSealByPnoAndCno/`,
    method: 'get',
    params: {
      projectNo,
      contractType,
      contractCode
    }
  })
}

/**
 * 用印合同 删除
 * @param {[String]} id  合同附件ID
 */
export function deleteSealAttach(id) {
  return request({
    url: `${SERVER1}/deleteSealAttach`,
    method: 'POST',
    params: {
      id
    }
  })
}

/**
 * 项目立项资料类别
 * @param {[String]} ascription 项目资料类别
 */
export function getCategorys(ascription) {
  return request({
    url: `${SERVER1}/conseal/getCategorys`,
    method: 'POST',
    params: {
      ascription
    }
  })
}

/**
 * 立项资料提交
 * @param {[String]} data 立项资料
 */
export function saveSeal(data) {
  return request({
    url: `${SERVER1}/contpl/saveSeal`,
    method: 'POST',
    data
  })
}

/**
 * 用印项目合同详情上传文件履历
 * @param {[String]} sealId  立项资料ID
 * @param {[String]} currentPage  当前页码
 */
export function findRecord(sealId, currentPage) {
  return request({
    url: `${SERVER1}/findSealResumesPageBySealId/`,
    method: 'get',
    params: {
      sealId,
      currentPage
    }
  })
}
