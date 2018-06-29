<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="project_name" placeholder="请输入项目名称" @change="changePro"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="seller_name" placeholder="请输入供应商名称" @change="changeSeller"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="debet_no" placeholder="请输入借据号" @change="changeDebet"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="voucher_no" placeholder="请输入申请单号" @change="changeVoucher"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-date-picker
          clearable
          v-model="timeInterval"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="changeData">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>
</div>
  
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Search',
  data() {
    return {
      timeInterval: [],
      project_name: null,
      seller_name: null,
      debet_no: null,
      voucher_no: null
    }
  },
  methods: {
    ...mapMutations({
      proName: 'SET_PARAM_SEARCH_PRONAME',
      sellerName: 'SET_PARAM_SEARCH_SELLERNAME',
      debetNo: 'SET_PARAM_SEARCH_DEBETNO',
      voucherNo: 'SET_PARAM_SEARCH_VOUCHERNO',
      time: 'SET_PARAM_SEARCH_TIME'
    }),
    handleSearch() {
      this.$emit('search')
    },
    changePro() {
      this.proName(this.project_name)
    },
    changeSeller() {
      this.sellerName(this.seller_name)
    },
    changeDebet() {
      this.debetNo(this.debet_no)
    },
    changeVoucher() {
      this.voucherNo(this.voucher_no)
    },
    changeData(val) {
      this.time(this.timeInterval)
    }
  },
  destroyed() {
    this.proName(null)
    this.sellerName(null)
    this.debetNo(null)
    this.voucherNo(null)
    // this.time([])
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
