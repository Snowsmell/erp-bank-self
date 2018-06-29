'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

/**=================================================================
 * 默认配置
 */
let baseConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@layout': resolve('src/views/layout'),
      '@order': resolve('src/views/order'),
      '@payment': resolve('src/views/payment'),
      '@dataList': resolve('src/views/dataList'),
      'imgs': resolve('src/images'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

/**=================================================================
 * 自定义配置
 */
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const PluginArr = []

// 引入外部扩展
const External = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT'
}

// 插入文件
const pluginIncludeAssets = function (assets = []) {
  return new HtmlWebpackIncludeAssetsPlugin({
    assets,
    append: false
  })
}


function baseExtend() {
  let _assets = {
    dev: [
      'static/vendor/element-ui/index.css'
    ],
    prod: [
      'static/vendor/base.vendor.js',
      'static/vendor/element-ui/index.css',
      'static/vendor/element-ui/index.js'
    ]
  }
  if (process.env.NODE_ENV === 'production') {
    baseConfig['externals'] = External
    PluginArr.push(pluginIncludeAssets(_assets.prod))
  } else {
    PluginArr.push(pluginIncludeAssets(_assets.dev))
  }
  baseConfig['plugins'] = PluginArr
}

/**=================================================================
 * 输出基本配置
 */
baseExtend()
module.exports = baseConfig
