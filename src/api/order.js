import request from '@/utils/request'
import HOST from './host'
const SERVER = `${HOST}/erp-bank-service/api/v1`
// const SERVER1 = `${HOST}/erp-bank-service-v1.2/api/v1`
const SERVER1 = `${HOST}/erp-bank-service/api/v1`

/** 供应商
 **********************************************************************/

/**
 * 供应商列表
 * 
 * @param {[number]} status 供应商状态
 * @param {[String]} vendorName 供应商名称
 */
export function getSupplierList(status = '', vendorName) {
  return request({
    url: `${SERVER}/vendors/list/`,
    method: 'get',
    params: {
      status,
      vendorName
    }
  })
}

/**
 * 供应商详情
 * 
 * @param {[number]} status 状态
 * @param {[string]} vendorCode 供应商代码
 */
export function getSupplierDetail(status, vendorCode) {
  return request({
    url: `${SERVER}/vendors/detail2/`,
    method: 'get',
    params: {
      status,
      vendorCode
    }
  })
}

/**
 * 查询供应商信息
 * 
 * @param {string} vendorCode 供应商代码
 */
export function getSupplierInfo(vendorCode) {
  return request({
    url: `${SERVER}/vendors/info/`,
    method: 'get',
    params: {
      vendorCode
    }
  })
}

/**
 * 查询供应商额度
 * 
 * @param {string} vendorName 供应商名称
 */
export function getSupplierCredit(vendorName) {
  return request({
    url: `${SERVER}/vendors/credit/`,
    method: 'get',
    params: {
      vendorName
    }
  })
}


/** 供应商还款
 **********************************************************************/

/**
 * 供应商还款列表查询
 * @param {string} vendorName 供应商名称
 */
export function getRepayList(vendorName) {
  return request({
    url: `${SERVER}/vendors/receipt/list/`,
    method: 'get',
    params: {
      vendorName
    }
  })
}

/**
 * 供应商还款详情
 * 
 * @param {[string]} vendorCode 供应商代码
 * @param {[Number]} page 页码
 */
export function getRepayDetail(vendorCode, page) {
  return request({
    url: `${SERVER}/vendors/receipt/detail/`,
    method: 'get',
    params: {
      vendorCode,
      page
    }
  })
}

/**
 * 获取银行账户列表
 */
export function getRepayBank() {
  return request({
    url: `${SERVER}/bank/accounts/`,
    method: 'get'
  })
}

/**
 * 借据详情
 * 
 * @param {[string]} receiptCode 供应商还款code
 * @param {[string]} requestCode 付款单code
 */
export function getReceiptDetail(receiptCode, requestCode) {
  return request({
    url: `${SERVER}/receipt/detail/`,
    method: 'get',
    params: {
      receiptCode,
      requestCode
    }
  })
}

/**
 * 借据详情2
 * 
 * @param {[string]} receiptCode 供应商还款code
 * @param {[string]} requestCode 付款单code
 */
export function getReceiptDetail2(receiptCode, requestCode) {
  return request({
    url: `${SERVER}/receipt/detail2/`,
    method: 'get',
    params: {
      receiptCode,
      requestCode
    }
  })
}

/**
 * 供应商还款 ⬆️
 * 
 * @param {[Object]} data 还款数据
 */
export function postReceipt(data) {
  return request({
    url: `${SERVER}/receipt/repayment/`,
    method: 'post',
    data
  })
}


/** 项目
 **********************************************************************/

/**
 * 项目列表
 * 
 * @param {[number]} status 供应商状态
 * @param {[String]} projectName 项目名称
 */
export function getProjectList(status = '', projectName) {
  return request({
    url: `${SERVER}/project/list/`,
    method: 'get',
    params: {
      status,
      projectName
    }
  })
}

/**
 * 项目详情
 * 
 * @param {[Object]} params 项目代码 {[projectCode | payRequestId]}
 */
export function getProjectDetail(params) {
  return request({
    url: `${SERVER}/project/detail/`,
    method: 'get',
    params
  })
}

/**
 * 项目供应商列表
 * 
 * @param {[number]} status 状态
 * @param {[string]} projectCode 项目代码
 */
export function getProjectIndex(status, projectCode) {
  return request({
    url: `${SERVER}/project/index/detail/`,
    method: 'get',
    params: {
      status,
      projectCode
    }
  })
}

/**
 * 项目数据汇总
 * 
 * @param {[Object]} params 项目代码 {vendorCode, [projectCode | payRequestId]}
 */
export function getProjectData(params) {
  return request({
    url: `${SERVER}/project/summary/`,
    method: 'get',
    params
  })
}


/** 采购单/提单/运单
 **********************************************************************/

/**
 * 采购单详情
 * 
 * @param {[Object]} params 采购单 {[orderId | payRequestId]}
 */
export function getOrderDetail(params) {
  return request({
    url: `${SERVER}/order/detail/`,
    method: 'get',
    params
  })
}

/**
 * 提单列表
 * 
 * @param {[string]} orderId 采购单id
 * @param {[string]} payRequestId 付款申请单id
 */
export function getDeliveryList(orderId, payRequestId) {
  return request({
    url: `${SERVER}/delivery/list/`,
    method: 'get',
    params: {
      orderId,
      payRequestId
    }
  })
}

/**
 * 提单详情
 * 
 * @param {[string]} deliveryId 提单id
 */
export function getDeliveryDetail(deliveryId) {
  return request({
    url: `${SERVER}/delivery/detail/`,
    method: 'get',
    params: {
      deliveryId
    }
  })
}

/**
 * 运单列表
 * 
 * @param {[Object]} params 运单 {[orderId | payRequestId]}
 */
export function getTransportList(params) {
  return request({
    url: `${SERVER}/transport/list/`,
    method: 'get',
    params
  })
}

/**
 * 运单详情
 * 
 * @param {[string]} transportId 运单id
 */
export function getTransportDetail(transportId) {
  return request({
    url: `${SERVER}/transport/detail/`,
    method: 'get',
    params: {
      transportId
    }
  })
}

/**
 * 运单详情2
 * 
 * @param {[string]} params 运单 {[orderId | payRequestId]}
 */
export function getTransportDetail2(params) {
  return request({
    url: `${SERVER}/transport/detail2/`,
    method: 'get',
    params
  })
}



/** 付款申请 / 应收转让
 **********************************************************************/

/**
 * 应收转让列表
 * 
 * @param {[number]} status 状态
 */
export function getTransferList(status) {
  return request({
    url: `${SERVER}/transfer/list/`,
    method: 'get',
    params: {
      status
    }
  })
}

/**
 * 我审批的付款申请单
 * 
 * @param {[Number]} status 审核状态
 */
export function getPaymentHandled(status) {
  return request({
    url: `${SERVER}/payrequest/handled/list/`,
    method: 'get',
    params: {
      status
    }
  })
}

/**
 * 我申请的付款申请单
 * 
 * @param {[Number]} status 审核状态
 */
export function getPaymentRequest(status) {
  return request({
    url: `${SERVER}/payrequest/requested/list/`,
    method: 'get',
    params: {
      status
    }
  })
}

/**
 * 申请付款列表
 * 
 * @param {[number]} status 状态
 * @param {[String]} vendorName 供应商名称
 */
export function getPaymentList(status, vendorName) {
  return request({
    url: `${SERVER}/payrequest/list/`,
    method: 'get',
    params: {
      status,
      vendorName
    }
  })
}

/**
 * 申请付款详情
 * 
 * @param {[string]} payRequestId 付款申请Id
 */
export function getPaymentDetail(payRequestId) {
  return request({
    url: `${SERVER}/payrequest/detail/`,
    method: 'get',
    params: {
      payRequestId
    }
  })
}

/**
 * 申请付款流程
 * 
 * @param {[string]} payRequestId 付款申请Id
 */
export function getPaymentProcess(payRequestId) {
  return request({
    url: `${SERVER}/payrequest/process/`,
    method: 'get',
    params: {
      payRequestId
    }
  })
}

/**
 * 申请付款转让流程
 * 
 * @param {[string]} payRequestId 付款申请Id
 */
export function getTransferProcess(payRequestId) {
  return request({
    url: `${SERVER}/transfer/process/`,
    method: 'get',
    params: {
      payRequestId
    }
  })
}

/**
 * 付款单 申请 ⬆️
 * 
 * @param {[Object]} data 
 */
export function postPayment(data) {
  return request({
    url: `${SERVER}/payrequest/`,
    method: 'post',
    data
  })
}

/**
 * 付款单 申请重审 ⬆️
 * 
 * @param {[JOSN]} data 
 */
export function postPaymentRetrail(data) {
  return request({
    url: `${SERVER}/retrail/`,
    method: 'post',
    data
  })
}

/**
 * 申请付款单 审批通过 ✅
 * 
 * @param {[Object]} data 
 */
export function postPaymentApprove(data) {
  return request({
    url: `${SERVER}/payrequest/approve/`,
    method: 'post',
    data
  })
}

/**
 * 申请付款单 审批拒绝 ❌
 * 
 * @param {[Object]} data 
 */
export function postPaymentReject(data) {
  return request({
    url: `${SERVER}/payrequest/reject/`,
    method: 'post',
    data
  })
}

/**
 * 应收付款转让申请 ⬆️
 * 
 * @param {[Object]} data 
 */
export function postTransfer(data) {
  return request({
    url: `${SERVER}/payrequest/transfer/`,
    method: 'post',
    data
  })
}

/**
 * 应收付款转让 审批通过 ✅
 * 
 * @param {[Object]} data 
 */
export function postTransferApprove(data) {
  return request({
    url: `${SERVER}/transfer/approve/`,
    method: 'post',
    data
  })
}

/**
 * 应收付款转让 审批拒绝 ❌
 * 
 * @param {[Object]} data 
 */
export function postTransferReject(data) {
  return request({
    url: `${SERVER}/transfer/reject/`,
    method: 'post',
    data
  })
}

/** 申请付款v1.2接口
 **********************************************************************/

/**
 * v1.2 申请付款 ❌
 * 
 * @param {[JSON]} data JSON数据
 */
export function launchPayRequest(data) {
  return request({
    url: `${SERVER1}/request/pay/`,
    method: 'post',
    data
  })
}

/**
 * v1.2 付款申请单单列表 列表数据 ❌
 * 
 * @param {[JSON]} data JSON数据
 * @param {[Number]} page 页数
 */
export function getRequestList(data) {
  return request({
    url: `${SERVER1}/request/list/`,
    method: 'get',
    params: data
  })
}

/**
 * v1.2付款申请单详情 
 * 
 * @param {[String]} requestId 付款单id
 */
export function getrequestDetail(requestId) {
  return request({
    url: `${SERVER1}/request/details/`,
    method: 'get',
    params: {
      requestId
    }
  })
}


/**
 * v1.2 付款申请发起 列表数据
 * 
 * @param {[Object]} data 
 */
export function getPayLaunchList(data) {
  return request({
    url: `${SERVER1}/transport/lists/`,
    method: 'get',
    params: data
  })
}

/**
 * v1.2 我发起的(业务员) 列表
 * 
 * @param {[Object]} data  
 */
export function getRequestedList(data) {
  return request({
    url: `${SERVER1}/payrequest/requested/list/`,
    method: 'get',
    params: data
  })
}

/**
 * v1.2 提单详情 后从提单进入查询
 * 
 * @param {[String]} deliveryId 
 */
export function newGetDeliveryDetail(deliveryId) {
  return request({
    url: `${SERVER1}/transport/details/`,
    method: 'get',
    params: {
      deliveryId
    }
  })
}

/**
 * v1.2 运单详情
 * 
 * @param {[String]} transportId 
 */
export function newGetTransportDetail(transportId) {
  return request({
    url: `${SERVER1}/transport/details/`,
    method: 'get',
    params: {
      transportId
    }
  })
}


/**
 * v1.2 供应商额度查询
 * 
 * @param {[String]} vendorName
 */
export function getVendorCredit(vendorName) {
  return request({
    url: `${SERVER1}/vendors/info/credit/`,
    method: 'get',
    params: {
      vendorName
    }
  })
}


