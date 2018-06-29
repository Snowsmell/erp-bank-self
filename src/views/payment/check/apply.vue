<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <!-- <order-left></order-left> -->

      <app-main-right v-loading="$store.getters.loading">
        <order-detail/>
      </app-main-right>
    </app-main>

    <app-footer
      text="金额合计"
      :amount="$store.getters.commonAmount">
      <el-button 
        type="primary" 
        @click="payRequest" 
        :disabled="isDisabled">申请付款
      </el-button>
    </app-footer>

  </el-container>
</template>

<script>
import { AppHeader, AppFooter, AppMain, AppMainRight } from '@layout/components'
import OrderLeft from '@order/order-left'
import OrderDetail from '@order/order-detail'

import { mapMutations, mapActions, mapState } from 'vuex'
import { postPaymentApprove, postPaymentReject } from '@/api/order'
import { getRole } from '@/utils/auth'

export default {
  components: {
    AppHeader, AppFooter, AppMain, AppMainRight,
    OrderLeft,
    OrderDetail
  },
  computed: {
    ...mapState({
      roleId: state => state.user.roleId 
    })
  },
  data() {
    return {
      pageLoading: false,
      isDisabled: false,
      enterRouter: ''
    }
  },
  methods: {
    ...mapMutations({
      search: 'SET_PAYMENT_SEARCHSTATUS',
      payment: 'SET_PAYMENT',
      status: 'SET_PAYMENT_STATUS'
    }),
    ...mapActions(['getPaymentList', 'setselectlist', 'launchPayRequest']),
    initData() {
      this.search('paymentCheck')
      this.pageLoading = true
      
      this.payment('getPaymentList')
      this.status(1)
      this.getPaymentList().then(res => {
        this.pageLoading = false
      })
      getRole() === 99 ? this.isDisabled = true : this.isDisabled = false
    },
    payRequest() {
      this.launchPayRequest().then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } 
      }).catch(err => {
        if (err.response.data.code === 500) {
          this.$message({
            message: err.response.data.message,
            type: 'error'
          })
        }
      })
    }    
  },
  mounted() {
    this.initData()
  },
  beforeRouteEnter (to, from, next) {
    next()
  }
}
</script>
<style >
.el-button{
  font-size: 20px;
}
</style>
