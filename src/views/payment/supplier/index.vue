<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <supplier-left :list="supplierList"></supplier-left> 

      <app-main-right v-loading="$store.getters.loading">
        <order-header type="company" :info="supplierData"></order-header>
        <supplier-tab></supplier-tab>
        <supplier-list
          v-if="currentSupplierProject.length > 0"
          :list="currentSupplierProject">
        </supplier-list>
        <div v-else class="no-data"><span>暂无数据</span></div>
      </app-main-right>
    </app-main>

    <app-footer
      v-if="supplierStatus === 0 || supplierStatus === 3"
      text="已选总金额"
      :amount="supplierSelectedInfo.amount">
      <!-- 通过默认slot(操作按钮) 和 slot=check 插入内容 -->
      <div class="check" slot="check">
        <!-- <el-checkbox v-model="checkeALl">全选</el-checkbox> -->
        <span class="info">已选择 {{supplierSelectedInfo.count}} 项采购合同</span>
      </div>
      <el-button
        v-if="supplierStatus === 0"
        type="primary"
        class="w150"
        @click="onApply">
        申请付款
      </el-button>
      <el-button
        v-if="supplierStatus === 3"
        type="primary"
        class="w150"
        @click="onReApply">
        申请重审
      </el-button>
    </app-footer>

  </el-container>
</template>

<script>
import { AppHeader, AppFooter, AppMain, AppMainRight } from '@layout/components'
import { OrderHeader } from '@order/components'
import { SupplierLeft, SupplierTab, SupplierList } from './components'

import { postPayment, postPaymentRetrail } from '@/api/order'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Supplier',
  components: {
    AppHeader, AppFooter, AppMain, AppMainRight,
    OrderHeader,
    SupplierList, SupplierTab, SupplierLeft
  },
  data() {
    return {
      pageLoading: true
    }
  },
  computed: {
    ...mapState({
      supplierStatus: state => state.supplier.currentSupplierStatus,
      currentSupplier: state => state.supplier.currentSupplier,
      supplierCredit: state => state.supplier.currentSupplierCredit,
      supplierSelected: state => state.supplier.supplierSelected,
      searchStatus: state => state.supplier.searchStatus,
      supplierList: state => state.supplier.supplierList
    }),
    ...mapGetters(['currentSupplierProject', 'currentSupplierCredit']),
    // 供应商 头部信息
    supplierData() {
      const { vendor_name, vendor_code } = this.currentSupplier
      return {
        logo: 'http://www.hwariot.com/assets/images/logo_icon.png',
        title: vendor_name,
        desc: {
          text: 'ID',
          value: vendor_code
        },
        amount: {
          text: '信用额度',
          value: this.currentSupplierCredit
        },
        count: {
          text: '待申请项目总数',
          value: this.currentSupplierProject.length
        }
      }
    },
    // 已选择申请付款项目信息
    supplierSelectedInfo() {
      let amount = 0
      let count = 0
      // 付款单 [申请|重审] 金额
      let amountName = this.supplierStatus === 0 ? 'order_amount' : 'pay_request_amount'
      let selectedArr = this.supplierSelected
      if (selectedArr.length > 0) {
        selectedArr.map(projectItem => {
          if (projectItem && projectItem.length > 0) {
            count += projectItem.length
            projectItem.map(orderItem => {
              amount += Number(orderItem[amountName])
            })
          }
        })
      }
      return {
        amount,
        count
      }
    }
  },
  methods: {
    ...mapMutations({ search: 'SET_SUPPLIER_SEARCH' }),
    ...mapActions(['getSupplierList', 'getSupplierDetail']),
    async initData() {
      this.search('supplier')
      
      const list = await this.getSupplierList(0)

      this.getSupplierDetail().then(res => {
        this.pageLoading = false
      }).catch(err => {
        this.pageLoading = false
      })
    },
    // 获取提交申请信息
    getApplyData() {
      let postData = []
      const { vendor_code, vendor_name } = this.currentSupplier

      let selectedArr = this.supplierSelected
      if (selectedArr.length > 0) {
        selectedArr.map(projectItem => {
          if (projectItem && projectItem.length > 0) {
            let orderList = []
            projectItem.map(orderItem => {
              orderList.push({
                'order_id': orderItem['order_id']
              })
            })
            postData.push({
              vendor_name,
              vendor_code,
              'order_list': orderList
            })
          }
        })
      }

      return postData
    },
    // 获取提交重审信息
    getReApplyData() {
      let payList = []

      let selectedArr = this.supplierSelected
      if (selectedArr.length > 0) {
        selectedArr.map(projectItem => {
          if (projectItem && projectItem.length > 0) {
            projectItem.map(orderItem => {
              payList.push(orderItem['pay_request_id'])
            })
          }
        })
      }

      return {
        'pay_request_id': payList
      }
    },
    /**
     * 处理 [申请|重审]
     * type: [0 申请 | 非0 审核]
     */
    handlePayment(type) {
      let promise
      if (type === 0) {
        promise = postPayment(this.getApplyData())
      } else {
        promise = postPaymentRetrail(this.getReApplyData())
      }
      promise.then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '申请成功!'
          })
          this.$router.push('/refresh')
        }
      })
      return promise
    },
    // 提交申请
    onApply() {
      if (this.supplierSelectedInfo.count === 0) {
        this.$alert('请选择采购合同', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定提交已选择的付款申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment(0)
      }).catch(() => {
        // console.log('取消操作')
      })
    },
    // 提交重审
    onReApply() {
      this.$confirm('确定提交已选择的申请重审?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment(1)
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
<style>
  .el-button{
    font-size: 20px;
  }
</style>
