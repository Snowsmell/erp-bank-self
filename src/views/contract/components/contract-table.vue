<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="project_name"
      label="项目名称"
      width="180">
    </el-table-column>

    <template v-if="isShow">
      <el-table-column
        prop="project_code"
        label="项目编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="parta"
        label="项目合同甲方">
      </el-table-column>
    </template>

    <template v-else>
      <el-table-column
        prop="contract_code"
        label="采购合同编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="parta"
        label="供应商">
      </el-table-column>
    </template>

    <el-table-column
      label="编辑时间">
      <template slot-scope="scope">
        {{scope.row.update_time | formatTime}}
      </template>
    </el-table-column>
    <el-table-column
      prop="apply_user"
      label="申请人">
    </el-table-column>
    <!-- <el-table-column
      label="状态">
      <template slot-scope="scope">
        <span v-if="scope.row.audit_status === '0'">未提交</span>
        <span v-else-if="scope.row.audit_status === '1'">已提交</span>
        <span v-else-if="scope.row.audit_status === '2'">完成</span>
        <span v-else-if="scope.row.audit_status === '3'">被驳回</span>
        <span v-else-if="scope.row.audit_status === '4'">已审核</span>
        <span v-else></span>
      </template>
    </el-table-column> -->
    <el-table-column
      prop="need_categorys"
      label="缺失文件数量">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.contract.projectIsShow
    })
  },
  methods: {
    ...mapMutations({
      getQuery: 'SET_CONTRACT_QUERY'
    }),
    handleClick(index, val) {
      this.getQuery(val)
      this.$router.push({path: '/contract/detail'})
    }
  }

}
</script>
