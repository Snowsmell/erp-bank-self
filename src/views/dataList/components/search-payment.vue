<template>
  <el-col :span="6">
    <el-input v-model="searchPayment" placeholder="请输入付款申请单号"></el-input>
  </el-col>    
</template>
<script>
export default {
  data() {
    return {
      searchPayment: ''
    }
  }
}
</script>
