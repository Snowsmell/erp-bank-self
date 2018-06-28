<template>
  <el-table
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      type="selection"
      fixed
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="提单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="件数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      align="right"
      label="付款申请总额">
    </el-table-column>
    <el-table-column
      prop="date"
      label="提货时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="date"
      label="收货时间"
      width="120">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '华瑞物联',
        province: '上海',
        city: '普陀区',
        address: '上海市',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '华瑞物联',
        province: '上海',
        city: '普陀区',
        address: '上海市',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '华瑞物联',
        province: '上海',
        city: '普陀区',
        address: '上海市',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '华瑞物联',
        province: '上海',
        city: '普陀区',
        address: '上海市',
        zip: 200333
      }]
    }
  }
}
</script>
