
import { getRole } from '@/utils/auth'

const roleId = getRole() || 1


let menus = [ {
  link: '/payment/',
  title: '付款申请',
  icon: 'el-icon-menu',
  role: [1]
}, {
  link: '/payment/review',
  title: '付款申请审核',
  icon: 'el-icon-menu',
  role: [2, 3, 4, 5, 99]
}, {
  link: '/approval/',
  title: roleId > 1 ? '我审批的' : '我发起的',
  icon: 'el-icon-document',
  role: [1]
  // role: [1, 2, 3, 4, 5]
}, {
  link: '/transfer/request',
  title: '应收转让申请',
  icon: 'el-icon-edit-outline',
  role: [2, 99]
}, {
  link: '/transfer/review',
  title: '应收转让审核',
  icon: 'el-icon-edit-outline',
  role: [6, 7, 8, 9, 99]
}, {
  link: '/repay/',
  title: '在线还款',
  icon: 'el-icon-sold-out',
  role: [4, 99]
}, {
  link: '/contract/',
  title: '资料上传',
  icon: 'el-icon-upload',
  role: [2]
}, {
  link: '/parameter/',
  title: '在线还款记录',
  icon: 'el-icon-upload',
  role: [2, 3, 4, 5, 6, 7, 8, 9]
}, {
  link: '/ledger/',
  title: '超级台账',
  icon: 'el-icon-upload',
  role: [1, 2, 3, 4, 5, 6, 7, 8, 9]
} ]

// menus.forEach(v => {
//   v.role = [1, 2, 3, 4, 5, 6, 7, 8, 9, 99]
// })

export function generateMenu(roleId) {
  let menuArr = []
  menus.map((menu, index) => {
    let menuRole = menu.role
    // role字段 [不存在 || 存在且包含roleId]
    if ((!menuRole) || (menuRole && menuRole.indexOf(roleId) !== -1)) {
      const { link, title, icon } = menu
      let menuItem = { link, title, icon }

      if (menu.children) {
        let childArr = []
        menu.children.map(child => {
          let childRole = child.role
          if ((!childRole) || (childRole && childRole.indexOf(roleId) !== -1)) {
            childArr.push({
              link: child.link,
              title: child.title
            })
          }
        })
        if (childArr.length > 0) {
          menuItem['children'] = childArr
        }
      }
      menuArr.push(menuItem)
    }
  })
  return menuArr
}

export function getHomeLink(roleId) {
  const link = {
    1: '/payment/',
    2: '/payment/',
    3: '/payment/check',
    4: '/payment/check',
    5: '/payment/check',
    6: '/transfer/check',
    7: '/transfer/check',
    8: '/transfer/check',
    9: '/transfer/check', 
    99: '/payment/check'
  }
  return link[roleId] || '/payment/'
}
