<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      label="项目名称/编号"
      width="180">
      <template slot-scope="scope">
        {{scope.row.project_name}} / {{scope.row.project_code}}
      </template>
    </el-table-column>
    <el-table-column
      label="供应商/ID"
      width="180">
      <template slot-scope="scope">
        {{scope.row.seller_name}} / {{scope.row.seller_cust_no}}
      </template>
    </el-table-column>
    <el-table-column
      prop="debet_no"
      label="借据号">
    </el-table-column>
    <el-table-column
      prop="voucher_no"
      label="付款申请单号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="repay_amt"
      label="还款金额">
    </el-table-column>
    <el-table-column
      label="约定还款日">
      <template slot-scope="scope">
        {{scope.row.pre_repay_time | formatTime}}
      </template>
    </el-table-column>
    <el-table-column
      label="申请人/还款时间">
      <template slot-scope="scope">
        {{scope.row.seller_name}} / 
        {{scope.row.repay_time | formatTime}}
      </template>
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <span v-if="scope.row.pay_status === '2'">还款处理中</span>
        <span v-else-if="scope.row.pay_status === '3'">还款失败</span>
        <span v-else-if="scope.row.pay_status === '4'">还款成功</span>
        <span v-else></span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleSelectionChange() {

    }
  }

}
</script>
