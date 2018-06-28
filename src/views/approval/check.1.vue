<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <order-left :list="paymentList"></order-left>
      <order-left
        :list="paymentList"
        :change-filter="changeStatus"
        aside-filter="AsideApprovalFilter">
      </order-left>

      <app-main-right v-loading="$store.getters.loading">
        <order-detail/>
      </app-main-right>
    </app-main>

    <app-footer
      text="总金额"
      :amount="2398472395">
      <el-button type="warning">拒绝</el-button>
      <el-button type="primary">通过</el-button>
    </app-footer>

  </el-container>
</template>

<script>
import { AppHeader, AppFooter, AppMain, AppMainRight } from '@layout/components'
import OrderLeft from '@order/order-left'
import OrderDetail from '@order/order-detail'

import { SET_APPROVAL_STATUS } from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    AppHeader, AppFooter, AppMain, AppMainRight,
    OrderLeft,
    OrderDetail
  },
  data() {
    return {
      pageLoading: true,
      paymentList: []
    }
  },
  computed: {
    ...mapState({
      currentStatus: state => state.order.approvalStatus
    })
  },
  methods: {
    ...mapMutations({
      setStatus: SET_APPROVAL_STATUS
    }),
    ...mapActions(['getPaymentList']),
    changeStatus(val) {
      this.setStatus(val)
      this.getPayList()
    },
    getPayList() {
      this.getPaymentList({
        payment: 'getPaymentHandled',
        status: this.currentStatus
      }).then(res => {
        if (res.code === 0 && res.data.count > 0) {
          this.paymentList = res.data.results
        }
        this.pageLoading = false
      })
    }
  },
  mounted() {
    this.getPayList()
  }
}
</script>
