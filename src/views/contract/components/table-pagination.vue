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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
  computed: {
    ...mapState({
      recordId: state => state.contract.recordId
    })
  },
  methods: {
    ...mapMutations({
      currentPage: 'SET_CONTRACT_CURRENTPAGE'
    }),
    ...mapActions(['getContractList', 'findRecord']),
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage(val)
      if (this.recordId !== '') {
        this.findRecord(this.recordId, val)
      } else {
        this.getContractList(val)
      }
    }
  }
}

</script>
<style scoped>
  .el-pagination{
    height: 27px;
  }
</style>

