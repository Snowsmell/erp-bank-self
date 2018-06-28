export function isType(arg) {
  return Object.prototype.toString.call(arg).replace(/^\[object (\w+)\]$/, '$1').toLowerCase()
}

// 时间格式化
export function parseDate(time, fmt) {
  let date
  const format = fmt || '{y}/{m}/{d} {h}:{i}:{s}'
  
  if (time) {
    date = (time instanceof Date) ? time : new Date(time)
  } else {
    date = new Date()
  }
  
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

// 千分位
export function toThousands(num) {
  return num && num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

// 获取文件后缀
export function fileSuffix(file) {
  let _type
  const suffix = file.split('.').pop().split('?')[0].toLocaleLowerCase() || ''
  
  if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(suffix) > -1) {
    _type = 'image'
  }
  if (['pdf'].indexOf(suffix) > -1) {
    _type = 'pdf'
  }
  if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(suffix) > -1) {
    _type = 'video'
  }
  if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(suffix) > -1) {
    _type = 'audio'
  }
  return _type
}

// 查询url参数
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
