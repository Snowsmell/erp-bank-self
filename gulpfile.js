const gulp = require('gulp')
const concat = require('gulp-concat')
const connect = require('gulp-connect')
const proxy = require('http-proxy-middleware')

const PORT = require('./config/port')

gulp.task('server', function () {
  connect.server({
    name: 'web',
    host: '0.0.0.0',
    root: 'dist',
    port: PORT.test,
    livereload: true,
    middleware: function (connect, opt) {
      return [
        proxy(['/erp-user-service/api/v1', '/erp-bank-service/api/v1', '/zuul/erp-contract-service/api/v1', '/erp-contract-service/api/v1'], {
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
