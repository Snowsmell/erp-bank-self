<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <order-left
        :itemChecked="handleCheck"/>

      <app-main-right v-loading="$store.getters.loading">
        <order-detail/>
      </app-main-right>
    </app-main>

    <app-footer
      text="总金额"
      :amount="$store.getters.paymentTransferAmount">
      <el-button type="warning" @click="onReject" :disabled="isDisabled">拒绝</el-button>
      <el-button type="primary" @click="onApprove" :disabled="isDisabled">通过</el-button>
      <!-- <el-button type="primary" @click="onApprove" :disabled="isDisabled">应收转让申请</el-button> -->
    </app-footer>

  </el-container>
</template>

<script>
import { AppHeader, AppFooter, AppMain, AppMainRight } from '@layout/components'
import OrderLeft from '@order/order-left'
import OrderDetail from '@order/order-detail'

import { SET_PAYMENT_SELECTED } from '@/store/mutation-types'
import { mapActions } from 'vuex'
import { postTransferApprove, postTransferReject } from '@/api/order'
import { getRole } from '@/utils/auth'

export default {
  components: {
    AppHeader, AppFooter, AppMain, AppMainRight,
    OrderLeft,
    OrderDetail
  },
  data() {
    return {
      pageLoading: false,
      isDisabled: false
    }
  },
  methods: {
    ...mapActions(['getPaymentList']),
    initData() {
      this.pageLoading = true
      this.getPaymentList({
        payment: 'getTransferList',
        status: 1
      }).then(res => {
        this.pageLoading = false
      })
      getRole() === 99 ? this.isDisabled = true : this.isDisabled = false
    },
    handleCheck(index) {
      // this.checkPayment(index)
      this.$store.commit(SET_PAYMENT_SELECTED, index)
    },
    handleTransfer(type) {
      // const payId = Number(this.$store.state.order.orderUrlQuery['payId'])
      let ids = []
      const payOrder = this.$store.state.order
      payOrder.paymentSelected.map(key => {
        ids.push(payOrder.paymentList[key]['pay_request_id'])
      })
      let postData = { ids }
      let promise
      if (type === 1) {
        promise = postTransferApprove(postData)
      }
      if (type === 0) {
        promise = postTransferReject(postData)
      }
      promise.then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.$router.push('/refresh')
        }
      }).catch(err => {
        if (err.response.data.code === 500) {
          this.$message({
            message: err.response.data.message,
            type: 'error'
          })
        }
      })
      return promise
    },
    onApprove() {
      if (this.$store.getters.paymentTransferAmount === 0) {
        this.$alert('请选择相应的申请单', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return 
      }
      this.$confirm('确定通过该应收转让申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleTransfer(1)
      }).catch(() => {
        // console.log('取消操作')
      })
    },
    onReject() {
      if (this.$store.getters.paymentTransferAmount === 0) {
        this.$alert('请选择相应的申请单', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return 
      }
      this.$confirm('确定拒绝该应收转让申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleTransfer(0)
      }).catch(() => {
        // console.log('取消操作')
      })
    }
  },
  mounted() {
    this.initData()
  },
  destroyed() {
    this.$store.commit(SET_PAYMENT_SELECTED, [])
  }
}
</script>
