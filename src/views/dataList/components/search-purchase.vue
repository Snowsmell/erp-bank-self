<template>
  <el-col :span="6">
    <el-input v-model="searchPurchase" placeholder="请输入采购合同单号"></el-input>
  </el-col>    
</template>
<script>
export default {
  data() {
    return {
      searchPurchase: ''
    }
  }
}
</script>
