<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      label="操作时间"
      width="180">
      <template slot-scope="scope">
        {{scope.row.option_time | formatTime}}
      </template>
    </el-table-column>
    <el-table-column
      prop="op_user"
      label="操作人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="option"
      label="操作内容">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'RecordTable',
  props: {
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
