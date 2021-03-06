import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import { getToken } from '@/utils/auth'
import BreadCrumb from './bread-crumb'

const Home = () => import(/* webpackChunkName: "group-common" */'@/views/home')
const Login = () => import(/* webpackChunkName: "group-common" */'@/views/login')
const Layout = () => import(/* webpackChunkName: "group-common" */'@/views/layout')
const DetailLayout = () => import(/* webpackChunkName: "group-common" */'@/views/detailLayout')

const Refresh = () => import('@/views/handle/refresh')

const Request = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/request/index')
const PaymentReview = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/paymentReview/index')
const Supplier = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/supplier')
const SupplierDetail = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/supplier/supplier-detail')
const Project = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/project')
const ProjectDetail = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/project/project-detail')
const PaymentCheck = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/check/check')
const ReadOnly = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/check/readonly')
const PaymentApply = () => import(/* webpackChunkName: "group-payment" */'@/views/payment/check/apply')


const Approval = () => import(/* webpackChunkName: "group-approval" */'@/views/approval/initiate/index')

const TransferApply = () => import(/* webpackChunkName: "group-transfer" */'@/views/transfer/apply')
const TransferCheck = () => import(/* webpackChunkName: "group-transfer" */'@/views/transfer/check')
const TransferReview = () => import(/* webpackChunkName: "group-transfer" */'@/views/transfer/review/index')
const TransferRequest = () => import(/* webpackChunkName: "group-transfer" */'@/views/transfer/request/index')

const Repay = () => import(/* webpackChunkName: "group-repay" */'@/views/repay')

const Contract = () => import(/* webpackChunkName: "group-contract" */'@/views/contract/index')
const ContractDetail = () => import(/* webpackChunkName: "group-contract" */'@/views/contract/detail/index')

const OrderDetail = () => import(/* webpackChunkName: "group-order" */'@/views/order/detail')

const Parameter = () => import(/* webpackChunkName: "group-parameter" */'@/views/parameter/index')

const DataList = () => import(/* webpackChunkName: "group-dataList" */'@/views/dataList/index')

const Ledger = () => import(/* webpackChunkName: "group-ledger" */'@/views/ledger/index')
Vue.use(Router)

/**
 * payment / supplier|project
 * pay/check
 * approval / initiate|check|cc
 * transfer / apply|check | review
 * contract / index
 */
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/refresh',
      name: 'Refresh',
      component: Refresh
    }, {
      path: '/detailLayout/',
      component: DetailLayout,
      redirect: '/detailLayout/apply',
      children: [
        {
          path: 'apply',
          name: 'PaymentApply',
          component: PaymentApply
        }, {
          path: 'readonly',
          name: 'PaymentReadOnly',
          component: ReadOnly
        }, {
          path: 'check',
          name: 'PaymentCheck',
          component: PaymentCheck
        }, {
          path: 'transferApply',
          name: 'TransferApply',
          component: TransferApply
        }
      ]
    }, {
      path: '/payment',
      component: Layout,
      redirect: '/payment/request',
      children: [
        {
          path: 'request',
          name: 'paymentRequest',
          component: Request
        },
        {
          path: 'review',
          name: 'PaymentReview',
          component: PaymentReview
        },
        {
          path: 'supplier',
          name: 'Supplier',
          component: Supplier
        }, {
          path: 'supplier/detail',
          name: 'SupplierDetail',
          component: SupplierDetail
        }, {
          path: 'project',
          name: 'Project',
          component: Project
        }, {
          path: 'project/detail',
          name: 'ProjectDetail',
          component: ProjectDetail
        }, 
        // {
        //   path: 'check',
        //   name: 'PaymentCheck',
        //   component: PaymentCheck
        // }, 
        // {
        //   path: 'readonly',
        //   name: 'PaymentReadOnly',
        //   component: ReadOnly
        // }, 
        // {
        //   path: 'apply',
        //   name: 'PaymentApply',
        //   component: DetailLayout
        // }, 
        {
          path: 'order',
          redirect: '/'
        }, {
          path: 'order/detail',
          name: 'OrderDetail',
          component: OrderDetail
        }
      ]
    }, {
      path: '/approval',
      component: Layout,
      redirect: '/approval/',
      children: [
        {
          path: '/',
          name: 'Approval',
          component: Approval
        }
      ]
    }, {
      path: '/transfer',
      component: Layout,
      redirect: '/transfer/request',
      children: [
        {
          path: 'request',
          name: 'transferRequest',
          component: TransferRequest
        },        
        // {
        //   path: 'apply',
        //   name: 'TransferApply',
        //   component: TransferApply
        // }, 
        {
          path: 'check',
          name: 'TransferCheck',
          component: TransferCheck
        }, {
          path: 'review',
          name: 'TransferReview',
          component: TransferReview
        }
      ]
    }, {
      path: '/repay',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Repay',
          component: Repay
        }
      ]
    }, {
      path: '/contract',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Contract',
          component: Contract
        }, {
          path: '/contract/detail',
          name: 'ContractDetail',
          component: ContractDetail
        }
      ]
    }, {
      path: '/parameter',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Parameter',
          component: Parameter
        }
      ]
    }, {
      path: '/Ledger',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Ledger',
          component: Ledger
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!getToken() && to.name !== 'Login') {
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  } else {
    to.meta.breadcrumb = BreadCrumb(to, from)
    next()
  }
})

export default router
