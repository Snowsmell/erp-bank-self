<template>
<div class="repay-pagination">
  <div class="repay-page-left">已选{{ count }}个借据</div>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage3"
    :page-size="10"
    layout="prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div>
</template>

<script>
import { SET_REPAY_SUPPLIER_LOAN, SET_REPAY_CODE } from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    total: Number
  },
  data() {
    return {
      currentPage3: 1
    }
  },
  computed: {
    ...mapState({
      repayLoanSelected: state => state.repay.repayLoanSelected,
      repayCode: state => state.repay.repayCode
    }),
    count() {
      return this.repayLoanSelected.length
    }
  },
  methods: {
    ...mapMutations({
      setRepaySupplierLoan: SET_REPAY_SUPPLIER_LOAN,
      setRepayCode: SET_REPAY_CODE
    }),
    ...mapActions([ 'getRepayLoan' ]),
    async getData(code, page) {
      Promise.all([this.getRepayLoan({code, page})]).then(res => {
        this.pageLoading = false
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.getData(this.repayCode, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.repay-pagination{
  display: flex;
  align-items: center;
  padding: 20px 0;
  color: #909399;
}
.repay-page-left{
  flex: 1;
}
</style>

