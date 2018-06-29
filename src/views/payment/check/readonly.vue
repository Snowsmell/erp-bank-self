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
    }  
  },
  mounted() {
    this.initData()
  }
}
</script>
<style >
.el-button{
  font-size: 20px;
}
</style>
