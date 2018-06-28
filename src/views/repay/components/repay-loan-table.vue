<template>
  <el-table
    :data="repayLoanList"
    style="width: 100%"
    :cell-class-name="setCellClass"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      :selectable="isHandleSelect"
      width="56">
    </el-table-column>
    <el-table-column
      label="借据号">
      <template slot-scope="scope">
        <!-- <router-link
          :to="{
            name: 'OrderDetail',
            query: {
              vendorCode: $store.getters.repaySupplierCode,
              payId: scope.row.request_id,
              payCode: scope.row.request_code,
              receiptCode: scope.row.receipt_code,
            }
          }">
          {{scope.row.receipt_code}}
        </router-link> -->
        {{scope.row.receipt_code}}
      </template>
    </el-table-column>
    <el-table-column
      label="付款申请单号">
      <template slot-scope="scope">
        <router-link
          v-for="(item, index) in scope.row.request_data"
          :key="index"
          :to="{
            name: 'OrderDetail',
            query: {
              vendorCode: $store.getters.repaySupplierCode,
              payId: item.request_id,
              payCode: item.request_code,
            }
          }"
          class="request_codes">
          {{item.request_code}}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column
      label="还款总金额">
      <template slot-scope="scope">
        ¥ {{scope.row.amount | formatCurrency}}
      </template>
    </el-table-column>
    <el-table-column
      label="剩余金额">
      <template slot-scope="scope">
        ¥ {{scope.row.balance | formatCurrency}}
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="120">
      <template slot-scope="scope">
        <span class="dot">•</span> {{scope.row.status.message}}
      </template>
    </el-table-column>
    <el-table-column
      label="到期日"
      width="120">
      <template slot-scope="scope">
        {{scope.row.end_date | formatTime}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { SET_REPAY_LOAN_SELECTED } from '@/store/mutation-types'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      repayLoanList: state => state.repay.repayLoanList.results || []
    })
  },
  methods: {
    ...mapMutations({
      setLoanSelected: SET_REPAY_LOAN_SELECTED
    }),
    handleSelectionChange(list) {
      this.setLoanSelected(list)
    },
    setCellClass({ row, columnIndex }) {
      if (columnIndex === 5) {
        return ['', '', 'cell-warning', 'cell-danger', 'cell-success'][row.status.code]
      }
      if (columnIndex === 3) {
        return 'blue'
      }
      return ''
    },
    isHandleSelect(row, index) {
      if (row.status.code === 1 || row.status.code === 1) {
        return true
      }
      return false
    }
  }
}
</script>

<style>
.cell-warning .dot{
  color: #E6A23C;
}
.cell-danger .dot{
  color: #F56C6C;
}
.cell-success .dot{
  color: #67C23A;
}
.request_codes {
  display: block;
}
</style>

