<template>
  <div class="side-filter">
    <h3>状态选择</h3>
    <el-radio-group
      v-model="status"
      @change="onchange">
      <el-radio :label="1">审批中</el-radio>
      <el-radio :label="2">审批通过</el-radio>
      <el-radio :label="3">被驳回</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    onchange: Function
  },
  data () {
    return {
      status: this.$store.state.order.approvalStatus
    }
  }
}
</script>
