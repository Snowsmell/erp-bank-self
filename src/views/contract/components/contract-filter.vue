<template>
  <el-row>
    <el-col :span="6">
      <el-select
        v-model="contract"
        @change="handleChange"
        style="width: 92%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-input
        v-model="input"
        :placeholder="inputText"
        style="width: 92%" />
    </el-col>
    <el-col :span="12">
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ContractFilter',
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      options: [{
        value: 1,
        label: '项目合同'
      }, {
        value: 2,
        label: '采购合同'
      }],
      contract: this.type || 1,
      input: ''
    }
  },
  computed: {
    inputText() {
      return this.contract === 1 ? '请输入项目名称' : '请输入采购合同编号'
    }
  },
  methods: {
    ...mapMutations({
      searchContent: 'SET_CONTRACT_SEARCH_CONTENT'
    }),
    handleChange(val) {
      this.searchContent('')
      this.input = ''
      this.$emit('onchange', val)
    },
    handleSearch() {
      this.$emit('onsearch', this.input)
    }
  }
}
</script>
