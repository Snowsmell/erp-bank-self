const gulp = require('gulp')
const concat = require('gulp-concat')
const connect = require('gulp-connect')
const proxy = require('http-proxy-middleware')

const devConf = require('./config/dev.conf')
const devProxy = devConf.proxy[0]

gulp.task('server', function () {
  connect.server({
    name: 'test',
    host: devConf.host,
    root: 'dist',
    port: devConf.port.test,
    livereload: true,
    middleware: function (connect, opt) {
      return [
        proxy(devProxy.context, {
          target: 'http://47.97.113.0:8080',
          changeOrigin: true
        }),
        proxy('/mock/v1', {
          target: 'http://192.168.1.100',
          changeOrigin: true
        })
      ]
    }
  })
})

gulp.task('build:bundle', done => {
  const files = require('./static/vendor.map')
  Object.keys(files).map(file => {
    gulp.src(files[file])
      .pipe(concat(`${file}`))
      .pipe(gulp.dest('static/'))
  })
})
