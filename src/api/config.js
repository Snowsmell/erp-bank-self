const url = {
  'dev': '',
  'sit': 'http://192.168.6.68:8080',
  'uat': 'http://47.97.113.0:8080',
  'prod': 'https://erp-bank-api.hwariot.com'
}

const host = url[process.env.ENV_TYPE] || ''

/**
 * 获取API接口 host/{service}/{version}
 * 
 * @param {[string]} service 接口服务名称 ['user-service']
 * @param {[string]} version 接口版本号 ['v1'], 若为空则 = null
 */
const apiURL = function (service, version = 'v1') {
  return version === null ? `${host}/${service}` : `${host}/${service}/api/${version}`
}

export {
  url,
  host,
  apiURL
}
