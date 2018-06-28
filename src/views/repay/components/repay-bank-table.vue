<template>
  <el-table
    :data="repayBankList"
    style="width: 100%">
    <el-table-column
      label="选择"
      width="56">
      <template slot-scope="scope">
        <el-radio
          class="el-check-radio"
          v-model="selectIndex"
          :label="scope.$index"
          @change="onChange">&nbsp;</el-radio>
      </template>
    </el-table-column>
    <el-table-column
      prop="bank_name"
      label="银行"
      width="240">
    </el-table-column>
    <el-table-column
      prop="bank_account_no"
      label="银行账号">
    </el-table-column>
    <el-table-column
      align="right"
      label="账户余额"
      width="240">
      <template slot-scope="scope">
        <span class="blue">¥ {{scope.row.bank_account_balance | formatCurrency}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { SET_REPAY_BANK_INDEX } from '@/store/mutation-types'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      selectIndex: this.repayBankIndex
    }
  },
  computed: {
    ...mapState({
      repayBankList: state => state.repay.repayBankList.results || [],
      repayBankIndex: state => state.repay.repayBankIndex
    })
  },
  watch: {
    repayBankList() {
      // 账户列表数据更新，重置 已选择
      this.setBankIndex(-1)
      this.selectIndex = this.repayBankIndex
    }
  },
  methods: {
    ...mapMutations({
      setBankIndex: SET_REPAY_BANK_INDEX
    }),
    onChange(val) {
      this.setBankIndex(val)
    }
  }
}
</script>
