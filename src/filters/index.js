import {
  parseDate,
  toThousands,
  isType
} from '@/utils'

export function formatCurrency(num) {
  if (num) {
    var str = (Number(num) * 100).toFixed(0).toString()
    return toThousands(str.slice(0, -2)) + '.' + str.slice(-2)
  }
  return 0
}

export function formatTime(time, format = '{y}/{m}/{d}') {
  if (!time) {
    return '-/-/-'
  }
  return parseDate(time, format)
}

// 若为数组，则返回数组长度，否则 0
export function arrayLength(arr) {
  if (isType(arr) === 'array') {
    return arr.length
  }
  return 0
}

// 若为数组，则返回第一条数据；否则返回该 数据
export function array0(arr) {
  if (isType(arr) === 'array') {
    return arr[0]
  }
  return arr
}
