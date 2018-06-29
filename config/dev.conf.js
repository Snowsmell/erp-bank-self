const host = process.env.HOST || '0.0.0.0'

const port = {
  dev: 3010,
  test: 3012,
  mock: 3014,
  analy: 3016
}

const proxy = [{
  context: ['/erp-user-service/api/v1', '/erp-bank-service-v1.2/api/v1', '/erp-bank-service/api/v1', '/zuul/erp-contract-service/api/v1', '/erp-contract-service/api/v1'],
  target: 'http://192.168.6.68:8080',
  // target: 'http://47.97.113.0:8080',
  changeOrigin: true
}]

module.exports = {
  host,
  port,
  proxy
}
