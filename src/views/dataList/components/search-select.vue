<template>
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
</template>
<script>
export default {
  data() {
    return {
      searchSelect: '',
      options: []
    }
  }
}
</script>
