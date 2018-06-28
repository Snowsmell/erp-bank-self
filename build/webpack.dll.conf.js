const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    // 需要引入的第三方库文件
    base: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
    ext: ['axios'],
    //echarts: ['echarts/lib/chart/bar','echarts/lib/chart/line']
  },
  output: {
    path: path.resolve(__dirname, '../static/dll'),
    filename: 'vendor.[name].js',
    library: '[name]'
  },
  plugins: [
    // 删除 dll 文件夹
    new CleanWebpackPlugin([path.resolve(__dirname, '../static/dll/')]),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DllPlugin({
      context: path.resolve(__dirname, '../'),
      path: path.join(__dirname, '../static/dll/', 'manifest.[name].json'),
      name: '[name]'
    }),
  ]
}
