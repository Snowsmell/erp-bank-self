<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="project_name" placeholder="请输入项目名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="seller_name" placeholder="请输入供应商名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          clearable
          v-model="timeInterval"
          type="daterange"
          range-separator="至"
          start-placeholder="最终放款开始日"
          end-placeholder="最终放款结束日"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>
</div>
  
</template>

<script>

export default {
  name: 'LedgerSearch',
  data() {
    return {
      timeInterval: [],
      project_name: '',
      seller_name: ''
    }
  },
  methods: {
    handleSearch() {
      const timeSlot = this.timeInterval || []
      const condition = {
        project_contract_name: this.project_name,
        supplier_name: this.seller_name,
        refund_day_from: timeSlot[0] || '',
        refund_day_to: timeSlot[1] || ''
      }
      this.$emit('search', condition)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 80%;
}
.el-row {
  margin-bottom: 15px;
}
.el-date-editor--daterange.el-input__inner {
  width: 80%;
}
</style>
