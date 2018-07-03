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
        <el-input v-model="requestCode" placeholder="请输入付款申请单号"></el-input>
      </el-col>
    </el-row> 
    <el-row>
      <el-col :span="6">
          <el-select v-model="searchSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handleFilter">查找</el-button>
      </el-col>
    </el-row> 
  </div>
</template>

<script>
export default {
  name: 'ReviewFilter',
  data() {
    return {
      projectName: '',
      vendorName: '',
      orderCode: '',
      requestCode: '',
      searchSelect: 1,
      options: [{
        value: 1,
        label: '待审核'
      }, {
        value: 2,
        label: '已通过'
      }, {
        value: 3,
        label: '已驳回'
      }]
    }
  },
  methods: {
    handleFilter() {
      let param = {
        projectName: this.projectName,
        vendorName: this.vendorName,
        orderCode: this.orderCode,
        requestCode: this.requestCode,
        status: this.searchSelect
      }
      this.$emit('changeFilter', param) 
    }
  }
}
</script>
