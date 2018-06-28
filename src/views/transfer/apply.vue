<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <order-left/>

      <app-main-right v-loading.lock="$store.getters.loading">
        <order-detail/>
      </app-main-right>
    </app-main>

    <app-footer
      text="总金额"
      :amount="$store.getters.paymentAmount">
      <el-button type="primary" class="w150" @click="onApply" :disabled="isDisabled">应收转让申请</el-button>
    </app-footer>

  </el-container>
</template>

<script>
import { AppHeader, AppFooter, AppMain, AppMainRight } from '@layout/components'
import OrderLeft from '@order/order-left'
import OrderDetail from '@order/order-detail'

import { mapMutations, mapActions } from 'vuex'
import { postTransfer } from '@/api/order'
import { getRole } from '@/utils/auth'

export default {
  components: {
    AppHeader, AppFooter, AppMain, AppMainRight,
    OrderLeft,
    OrderDetail
  },
  data() {
    return {
      pageLoading: true,
      isDisabled: false
    }
  },
  methods: {
    ...mapMutations({
      search: 'SET_PAYMENT_SEARCHSTATUS',
      payment: 'SET_PAYMENT',
      status: 'SET_PAYMENT_STATUS'
    }),
    ...mapActions(['getPaymentList']),
    initData() {
      this.search('transferApply')
      this.pageLoading = true
      this.payment('getPaymentList')
      this.status(4)
      this.getPaymentList().then(res => {
        this.pageLoading = false
      })
      getRole() === 99 ? this.isDisabled = true : this.isDisabled = false
    },
    handleApply() {
      const payId = Number(this.$store.state.order.orderUrlQuery['payId'])
      let postData = {
        ids: [payId]
      }
      postTransfer(postData).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '申请成功!'
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
    },
    onApply() {
      if (this.$store.getters.paymentAmount === 0) {
        this.$alert('请选择相应的申请单', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定要提交该应收转让申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleApply()
      }).catch(() => {
        // console.log('取消操作')
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>
