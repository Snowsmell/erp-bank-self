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
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'TablePage',
  data() {
    return {
      pageSize: 10
    }
  },
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapMutations(['SET_NOW_PAGE']),
    ...mapActions(['getRequestPay', 'getRequestList', 'newGetDeliveryList', 'getRequestedList']),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.SET_NOW_PAGE(val)
      this.handleJump(val)
      console.log(`当前页: ${val}`)
    },
    handleJump(val) {
      this.$emit('update:nowPage', val)
    }
  }
}

</script>
<style scoped>
  .el-pagination{
    height: 27px;
  }
</style>

