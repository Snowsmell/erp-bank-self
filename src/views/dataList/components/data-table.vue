<template>
<el-table
  :data="tableData"
  @row-dblclick="dbHandle"
  @select="handleSelect"
  @select-all="handleSelectAll"
  style="width: 100%"
  class="dataTable">

  <el-table-column type="selection" width="40" v-if=" roleId !== 1"></el-table-column>

  <el-table-column type="index" label="编号" width="50"></el-table-column>

  <el-table-column label="项目名称/编号" width="180">
    <template slot-scope="scope">
      {{scope.row.project_name}}<br/>{{scope.row.project_code}}
    </template>
  </el-table-column>

  <el-table-column label="供应商/ID" width="180">
    <template slot-scope="scope">
      {{scope.row.vendor_name}}<br/>{{scope.row.vendor_code}}
    </template>
  </el-table-column>

  <el-table-column prop="request_code" label="付款申请单号" width="180"></el-table-column>

  <el-table-column prop="project_contract_code" label="采购合同编号" width="180">
    <template slot-scope="scope">
      {{scope.row.order_code}}
    </template>
  </el-table-column>

  <el-table-column label="账期(天)/约定还款日" width="180">
    <template slot-scope="scope">
      {{scope.row.bill_period}}<br/>{{scope.row.repay_date | formatTime}}
    </template>
  </el-table-column>

  <el-table-column label="申请人/时间" width="180">
    <template slot-scope="scope">
      {{scope.row.created_by}}<br/>{{scope.row.pay_request_date | formatTime}}
    </template>
  </el-table-column>

  <el-table-column label="申请金额" width="180">
    <template slot-scope="scope">
      ￥ {{scope.row.amount | formatCurrency}}
    </template>
  </el-table-column>

  <el-table-column prop="status.message" label="状态" width="180"></el-table-column>
</el-table>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    nowpage: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      roleId: state => state.user.roleId
    })
  },  
  methods: {
    ...mapActions({
      setselectlist: 'setselectlist'}
    ),
    dbHandle(val, ev) {
      this.setselectlist([val])
      this.$router.push({
        path: '/payment/check',
        query: {
          payId: val.request_id || val.pay_request_id,
          vendorCode: val.vendor_code
        }
      })
    },
    handleSelect(selection) {
      this.setselectlist(selection)
    },
    handleSelectAll(selection) {
      this.setselectlist(selection)
    }
  }
}
</script>

<style lang="scss" >
.dataTable tbody tr td{
  &:nth-of-type(9),{
    color:#007AFF;
  } 
}
</style>
