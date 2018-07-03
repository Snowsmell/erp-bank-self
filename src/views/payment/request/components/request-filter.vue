<template>
  <div class="filter">
    <el-row>
      <el-col :span="6">
        <el-input v-model="projectName" placeholder="请输入项目名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="vendorName" placeholder="请输入供应商名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="orderCode" placeholder="请输入采购合同单号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handleFilter">查找</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RequestFilter',
  data() {
    return {
      projectName: '',
      vendorName: '',
      orderCode: ''
    }
  },
  methods: {
    handleFilter() {
      let param = {
        projectName: this.projectName,
        vendorName: this.vendorName,
        orderCode: this.orderCode
      }
      this.$emit('changeFilter', param) 
    }
  }
}
</script>
