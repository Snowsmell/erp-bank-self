<template>
  <div class="order-list-item">
    <div class="order-list-header">
      <div class="info">
        <div class="name">{{info.project_name}}</div>
        <span class="text">项目合同编号：{{info.project_code}}</span>
      </div>
      <div class="amount">
        <div class="rmb num">¥ {{info.order_amount | formatCurrency}}</div>
        <span class="text">项目总金额</span>
      </div>
    </div>
    <list-table-apply
      v-if="status.code === 0"
      :list="info.order_list || []"
      :idx="idx"
      :status="status"
      :project-code="info.project_code"/>
    <list-table-check
      v-else
      :list="info.pay_request_list || []"
      :idx="idx"
      :status="status"/>
  </div>
</template>

<script>
import ListTableApply from './supplier-table-apply'
import ListTableCheck from './supplier-table-check'

export default {
  components: {
    ListTableApply,
    ListTableCheck
  },
  props: {
    info: {
      type: Object,
      required: true,
      default() {
        return {}
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
  }
}
</script>

