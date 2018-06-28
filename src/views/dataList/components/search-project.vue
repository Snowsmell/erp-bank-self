<template>
  <span>
    <el-col :span="6"><el-input v-model="searchProject" placeholder="请输入项目名称"></el-input></el-col>
    <el-col :span="6"><el-input v-model="searchSuppier" placeholder="请输入供应商名称"></el-input></el-col>
  </span>
</template>
<script>
export default {
  data() {
    return {
      searchProject: '',
      searchSuppier: ''
    }
  }
}
</script>
