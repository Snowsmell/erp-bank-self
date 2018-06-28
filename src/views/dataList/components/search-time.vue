<template>
  <el-col :span="6">
    <el-date-picker
        clearable
        v-model="searchTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        @change="changeData">
    </el-date-picker>
  </el-col>  
</template>
<script>
export default {
  data() {
    return {
      searchTime: []
    }
  },
  methods: {
    changeData(val) {
      console.log(`此前的时间区间为${val}`)
    }
  }
}
</script>
