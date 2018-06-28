<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <order-left
        :change-filter="changeStatus"
        aside-filter="AsideApprovalFilter">
      </order-left>

      <app-main-right v-loading="$store.getters.loading">
        <order-detail/>
      </app-main-right>
    </app-main>

    <app-footer
      v-if="false"
      text="总金额"
      :amount="$store.getters.paymentAmount">
      <el-button type="warning" @click="onReject">拒绝</el-button>
      <el-button type="primary" @click="onApprove">通过</el-button>
    </app-footer>
    <!-- <app-footer
      v-else-if="roleId === 1 && currentStatus === 3"
      text="总金额"
      :amount="$store.getters.paymentAmount">
      <el-button
        type="primary"
        class="w150"
        @click="onRetrial">申请重审</el-button>
    </app-footer> -->

  </el-container>
</template>

<script>
import { AppHeader, AppFooter, AppMain, AppMainRight } from '@layout/components'
import OrderLeft from '@order/order-left'
import OrderDetail from '@order/order-detail'

import { SET_APPROVAL_STATUS, SET_ORDER_ISSHOW } from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

import { postPaymentApprove, postPaymentReject, postPaymentRetrail } from '@/api/order'

export default {
  components: {
    AppHeader, AppFooter, AppMain, AppMainRight,
    OrderLeft,
    OrderDetail
  },
  data() {
    return {
      pageLoading: false
    }
  },
  computed: {
    ...mapState({
      currentStatus: state => state.order.approvalStatus,
      roleId: state => state.user.roleId,
      payId: state => Number(state.order.orderUrlQuery['payId'])
    }),
    payName() {
      return this.roleId > 1 ? 'getPaymentHandled' : 'getPaymentRequest' 
    }
  },
  methods: {
    ...mapMutations({
      setStatus: SET_APPROVAL_STATUS,
      setShow: SET_ORDER_ISSHOW
    }),
    ...mapActions(['getPaymentList']),
    changeStatus(val) {
      this.setStatus(val)
      this.getPayList()
    },
    getPayList() {
      this.setShow(false)
      this.pageLoading = true
      this.getPaymentList({
        payment: this.payName,
        status: this.currentStatus
      }).then(res => {
        this.pageLoading = false
      })
    },
    handlePayment(type) {
      let postData = {
        ids: [this.payId]
      }
      let promise
      if (type === 'approve') {
        promise = postPaymentApprove(postData)
      }
      if (type === 'reject') {
        promise = postPaymentReject(postData)
      }
      if (type === 'retrial') {
        promise = postPaymentRetrail(postData)
      }
      promise.then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.$router.push('/refresh')
        }
      })
      return promise
    },
    onApprove() {
      this.$confirm('确定通过该付款申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment('approve')
      }).catch(() => {
        // console.log('取消操作')
      })
    },
    onReject() {
      this.$confirm('确定拒绝该付款申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment('reject')
      }).catch(() => {
        // console.log('取消操作')
      })
    },
    onRevoke() {
      this.$confirm('确定撤销该付款单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment('revoke')
      }).catch(() => {
        // console.log('取消操作')
      })
    },
    onRetrial() {
      this.$confirm('确定提交该付款单进行重审?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment('retrial')
      }).catch(() => {
        // console.log('取消操作')
      })
    }
  },
  mounted() {
    this.getPayList()
  },
  destroyed() {
    this.setShow(true)
  }
}
</script>
