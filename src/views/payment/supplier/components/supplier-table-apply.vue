<template>
  <el-table
    ref="supplierTable"
    :data="list"
    style="width: 100%"
    :cell-class-name="setCellClass"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      fixed
      width="42">
    </el-table-column>
    <el-table-column
      type="index"
      width="36">
    </el-table-column>
    <el-table-column
      label="采购合同编号">
      <template slot-scope="scope">
        <router-link
          :to="{
            name: 'SupplierDetail',
            query: {
              orderId: scope.row.order_id,
              projectCode,
              vendorCode: $store.getters.currentSupplierCode
            }
          }">
          {{scope.row.order_code}}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="order_weight"
      label="采购重量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="quantity"
      label="件数"
      width="80">
    </el-table-column>
    <el-table-column
      align="right"
      label="采购总金额"
      width="180">
      <template slot-scope="scope">
        ¥ {{scope.row.order_amount | formatCurrency}}
      </template>
    </el-table-column>
    <el-table-column
      label="审核状态"
      width="120">
      <template slot-scope="scope">
        <span :class="status.class">•</span> {{status.message}}
      </template>
    </el-table-column>
    <el-table-column
      label="签订日期"
      width="120">
      <template slot-scope="scope">
        {{scope.row.order_date | formatTime}}
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
    projectCode: {
      type: String,
      required: true
    },
    idx: {
      type: Number,
      required: true
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
