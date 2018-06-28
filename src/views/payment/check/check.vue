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
      <template v-if="roleId === 2">
        <el-button 
          type="warning" 
          @click="onReject" 
          :disabled="isDisabled">拒绝
        </el-button>         
        <el-button 
          type="primary" 
          @click="onApprove"           
          :disabled="isDisabled">通过
        </el-button>         
      </template>


      <el-button 
        v-if="roleId === 1"
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
      isDisabled: false
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
    handlePayment(type) {
      const payId = this.$store.state.common.selectedList.map(v => {
        return v.request_id
      })
      let postData = {
        ids: payId
      }
      let promise
      if (type === 1) {
        promise = postPaymentApprove(postData)
      }
      if (type === 0) {
        promise = postPaymentReject(postData)
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
      this.$confirm('确定通过该付款申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment(1)
      }).catch(() => {
      })
    },
    onReject() {
      this.$confirm('确定拒绝该付款申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment(0)
      }).catch(() => {
        // console.log('取消操作')
      })
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
  beforeRouteLeave (to, from, next) {
    this.setselectlist([])
    next()
  }
}
</script>
<style >
.el-button{
  font-size: 20px;
}
</style>
