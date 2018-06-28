import request from '@/utils/request'
import HOST from './host'
const SERVER = `${HOST}/erp-user-service/api/v1`
const SERVER1 = `${HOST}/erp-bank-service/api/v1`

/**
 * 发送短信验证码
 * 
 * @param {[string]} phone 手机号
 */
export function sendSMS(phone) {
  return request({
    url: `${SERVER}/users/sms/`,
    method: 'post',
    data: {
      phone_number: phone
    }
  })
}

/**
 * 短信登陆
 * 
 * @param {[string]} phone 手机号
 * @param {[string]} code 短信验证码
 * @param {[string]} number 短信流水号
 */
export function loginBySMS(phone, code, number) {
  return request({
    url: `${SERVER}/users/login/`,
    method: 'post',
    data: {
      user_name: phone,
      verify_code: code,
      serial_number: number
    }
  })
}

// 登出
export function logout() {
  return request({
    url: '',
    method: 'post'
  })
}

/**
 *  v1.2 获取当月申请总额
 */
export function getMonthRequested() {
  return request({
    url: `${SERVER1}/system/requested/month/`,
    method: 'get'
  })
}

/**
 *  v1.2 获取当日申请总额
 */
export function getDayRequested() {
  return request({
    url: `${SERVER1}/system/requested/day/`,
    method: 'get'
  })
}
