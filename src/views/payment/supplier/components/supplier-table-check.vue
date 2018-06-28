<template>
  <el-table
    ref="supplierTable"
    :data="list"
    style="width: 100%"
    :cell-class-name="setCellClass"
    @selection-change="handleSelectionChange">>
    <el-table-column
      v-if="status.code === 3"
      type="selection"
      fixed
      width="42">
    </el-table-column>
    <el-table-column
      type="index"
      width="36">
    </el-table-column>
    <el-table-column
      label="付款申请单号"
      width="180">
      <template slot-scope="scope">
        <router-link
          :to="{
            name: 'SupplierDetail',
            query: {
              payId: scope.row.pay_request_id,
              vendorCode: $store.getters.currentSupplierCode
            }
          }">
          {{scope.row.pay_request_code}}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="pay_request_weight"
      label="申请重量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="quantity"
      label="件数"
      width="80">
    </el-table-column>
    <el-table-column
      label="审核状态"
      width="120">
      <template slot-scope="scope">
        <span :class="status.class">•</span> {{status.message}}
      </template>
    </el-table-column>
    <el-table-column
      align="right"
      label="付款申请总金额">
      <template slot-scope="scope">
        ¥ {{scope.row.pay_request_amount | formatCurrency}}
      </template>
    </el-table-column>
    <el-table-column
      label="开始日期"
      width="120">
      <template slot-scope="scope">
        {{scope.row.start_date | formatTime}}
      </template>
    </el-table-column>
    <el-table-column
      :label="dateLabel"
      width="120">
      <template slot-scope="scope">
        {{scope.row.approve_date | formatTime}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  SET_SUPPLIER_SELECTED,
  SET_SUPPLIER_SELECTED_FALSE
} from '@/store/mutation-types'

export default {
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    status: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    }
  },
  computed: {
    dateLabel() {
      const i = this.status.code
      return ['', '审核日期', '通过日期', '被驳日期'][i]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$store.commit(SET_SUPPLIER_SELECTED_FALSE, {
        index: this.idx,
        value: val
      })
      this.$store.commit(SET_SUPPLIER_SELECTED)
    },
    setCellClass({ row, columnIndex }) {
      if (columnIndex === 5) {
        return 'blue'
      }
      return ''
    }
  }
}
</script>
