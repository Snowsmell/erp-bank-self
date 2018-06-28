<template>
  <el-input placeholder="请输入内容" v-model="inputSearch" class="side-search">
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input>
</template>

<script>
import { SET_LOADING, SET_CURRENT_SUPPLIER } from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: ['searchType'],
  data() {
    return {
      inputSearch: ''
    }
  },
  computed: {
    ...mapState({
      supplierInput: state => state.supplier.searchStatus,
      projectInput: state => state.project.searchStatus,
      paymentCheckInput: state => state.order.searchStatus,
      repayInput: state => state.repay.searchStatus,
      contractInput: state => state.contract.contractSearch
    })
  },
  methods: {
    ...mapMutations({
      supplierVendorName: 'SET_SUPPLIER_VENDERNAME',
      projectVendorName: 'SET_PROJECT_VENDERNAME',
      paymentVendorName: 'SET_PAYMENT_VENDORNAME',
      repayVendorName: 'SET_REPAY_VENDORNAME',
      contractProjectName: 'SET_CONTRACT_PROJECTNAME'
    }),
    ...mapActions(['getSupplierList', 'getProjectList', 'getPaymentList', 'getRepaySupplier', 'getContractList']),
    search() {
      this.supplierVendorName(this.inputSearch)
      this.projectVendorName(this.inputSearch)
      this.paymentVendorName(this.inputSearch)
      this.repayVendorName(this.inputSearch)
      this.contractProjectName(this.inputSearch)

      if (this.supplierInput === 'supplier') {
        this.getSupplierList(0)
      }

      if (this.projectInput === 'project') {
        this.getProjectList(0)
      }

      if (this.paymentCheckInput === 'paymentCheck' || this.paymentCheckInput === 'transferApply') {
        this.getPaymentList()
        this.paymentVendorName('')
      }

      if (this.repayInput === 'repay') {
        this.getRepaySupplier()
      }

      if (this.contractInput === 'contract') {
        this.getContractList()
      }
    }
  }
}
</script>
