<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="1"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>

export default {
  name: 'TablePage',
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.$emit('returnPage')
    }
  }
}

</script>
<style scoped>
  .el-pagination{
    height: 27px;
  }
</style>

