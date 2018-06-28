<template>
  <div class="block">
    <!-- <span class="demonstration">大于 7 页时的效果</span> -->
    <el-pagination
      layout="prev, pager, next"
      :total="tot"
      :page-size=7>
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ['tot']
}
</script>
<style scoped>
  .el-pagination{
    height: 27px;
  }
</style>

