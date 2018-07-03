<template>
  <div class="filter">
    <el-row>
      <el-col :span="8">
        <el-input v-model="projectName" placeholder="请输入项目名称"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="vendorName" placeholder="请输入供应商名称"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="orderCode" placeholder="请输入采购合同单号"></el-input>
      </el-col>
      
    </el-row> 
    <el-row>
      <el-col :span="8">
        <el-input v-model="requestCode" placeholder="请输入付款申请单号"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="handleFilter">查找</el-button>
      </el-col>
    </el-row> 
  </div>
</template>

<script>
export default {
  name: 'TranRequestFilter',
  data() {
    return {
      projectName: '',
      vendorName: '',
      orderCode: '',
      requestCode: ''
    }
  },
  methods: {
    handleFilter() {
      let param = {
        projectName: this.projectName,
        vendorName: this.vendorName,
        orderCode: this.orderCode,
        requestCode: this.requestCode
      }
      this.$emit('changeFilter', param) 
    }
  }
}
</script>
