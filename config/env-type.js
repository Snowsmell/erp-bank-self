'use strict'
const argv = require('yargs').argv

const type = {
  'dev': '"dev"',
  'sit': '"sit"',
  'uat': '"uat"',
  'prod': '"prod"'
}

module.exports = argv.env ? type[argv.env._type] : '""'
