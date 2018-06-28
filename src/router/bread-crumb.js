const routes = {
  'OrderDetail': {
    text: '信息详情'
  },
  'Supplier': {
    name: 'Supplier',
    text: '供应商列表'
  },
  'SupplierDetail': {
    text: '付款申请详情',
    path: ['Supplier', 'SupplierDetail']
  },
  'Project': {
    name: 'Project',
    text: '项目列表'
  },
  'ProjectDetail': {
    text: '付款申请详情',
    path: ['Project', 'ProjectDetail']
  },
  'PaymentCheck': {
    name: 'PaymentCheck',
    text: '付款申请审核列表'
  },
  'Approval': {
    name: 'Approval',
    text: '审批'
  },
  'TransferApply': {
    name: 'TransferApply',
    text: '应收转让申请'
  },
  'TransferCheck': {
    name: 'TransferCheck',
    text: '应收转让审核'
  },
  'Repay': {
    name: 'Repay',
    text: '在线还款'
  },
  'Contract': {
    name: 'Contract',
    text: '资料上传'
  },
  'ContractDetail': {
    text: '立项资料详情',
    path: ['Contract', 'ContractDetail']
  },
  'Parameter': {
    name: 'Parameter',
    text: '还款记录'
  }
}

function getPath(path) {
  let arr = []
  let route = routes[path.name]
  if (route) {
    if (route.path) {
      route.path.map(item => {
        arr.push(routes[item])
      })
    } else {
      arr.push(route)
    }
  }
  return arr
}

export default function(to, from) {
  let routeList = []
  if (to.name === 'OrderDetail' && from.name) {
    routeList = getPath(from)
    routeList.push(routes['OrderDetail'])
  } else {
    routeList = getPath(to)
  }
  return routeList
}
