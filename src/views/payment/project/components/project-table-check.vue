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
      align="center"
      width="48">
    </el-table-column>
    <el-table-column
      label="付款申请单号">
      <template slot-scope="scope">
        <router-link
          :to="{name: 'ProjectDetail', query: {payId: scope.row.request_id, vendorCode}}">
          {{scope.row.request_code}}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="weight"
      label="采购重量"
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
        ¥ {{scope.row.amount | formatCurrency}}
      </template>
    </el-table-column>
    <el-table-column
      label="开始日期"
      width="120">
      <template slot-scope="scope">
        {{scope.row.request_date | formatTime}}
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
  SET_PROJECT_SELECTED,
  SET_PROJECT_SELECTED_FALSE
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
    vendorCode: {
      type: String,
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
      this.$store.commit(SET_PROJECT_SELECTED_FALSE, {
        index: this.idx,
        value: val
      })
      this.$store.commit(SET_PROJECT_SELECTED)
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
