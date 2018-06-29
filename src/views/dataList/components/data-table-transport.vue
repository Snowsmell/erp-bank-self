<template>
<!-- 付款申请 业务员 -->
<el-table
  :data="tableData"
  @row-dblclick="dbHandle"
  @select="handleSelect"
  @select-all="handleSelectAll"
  stripe
  style="width: 100%;text-align:justify"
  class="tranportTable">

  <el-table-column type="selection" width="40"></el-table-column>


  <el-table-column label="项目名称/编号" width="190">
    <template slot-scope="scope">
      {{scope.row.project_name}}<br/>{{scope.row.project_code}}
    </template>
  </el-table-column>

  <el-table-column label="供应商/ID" width="190">
    <template slot-scope="scope">
      {{scope.row.vendor_name}}<br/>{{scope.row.vendor_code}}
    </template>
  </el-table-column>

  <el-table-column prop="project_contract_code" label="采购合同编号" width="190">
    <template slot-scope="scope">
      {{scope.row.order_code}}
    </template>
  </el-table-column>

  <el-table-column label="采购合同金额" width="190">
    <template slot-scope="scope">
      ￥ {{scope.row.order_amount | formatCurrency}}
    </template>
  </el-table-column>

  <el-table-column label="运单编号/收货时间" width="190">
    <template slot-scope="scope">
      {{scope.row.transport_code}}<br/>{{scope.row.receive_time | formatTime}}
    </template>
  </el-table-column>

  <el-table-column label="提单号" width="180">
    <template slot-scope="scope">
      {{scope.row.delivery_code}}
    </template>
  </el-table-column>

  <el-table-column label="提单金额" width="180">
    <template slot-scope="scope">
      ￥ {{scope.row.delivery_amount | formatCurrency}}
    </template>
  </el-table-column>

  <el-table-column label="供应商可用额度" width="180">
    <template slot-scope="scope">
      ￥ {{scope.row.credit | formatCurrency}}
    </template>
  </el-table-column>
</el-table>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },  
  methods: {
    ...mapActions({
      setselectlist: 'setselectlist'}
    ),
    dbHandle(val, ev) {
      this.setselectlist([val])
      this.$router.push({
        path: '/payment/apply',
        query: {
          deliveryId: val.delivery_id,
          vendorCode: val.vendor_code
        }
      })
    },
    handleSelect(selection) {
      console.log(selection)
      this.setselectlist(selection)
    },
    handleSelectAll(selection) {
      this.setselectlist(selection)
    }
  }
}
</script>

<style lang="scss" >
.tranportTable tbody tr td{
  &:nth-of-type(5),
  &:nth-of-type(9),
  &:nth-of-type(10),{
    color:#007AFF;
  } 
}
</style>




