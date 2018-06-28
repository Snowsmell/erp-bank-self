<template>
  <el-col :span="6">
    <el-input v-model="searchIous" placeholder="请输入借据号"></el-input>
  </el-col>    
</template>
<script>
export default {
  data() {
    return {
      searchIous: ''
    }
  }
}
</script>
