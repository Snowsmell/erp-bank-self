<template>
  <div class="order-list-item">
    <div class="order-list-header">
      <div class="info">
        <div class="name">{{info.vendor_name}}</div>
        <span class="text">ID：{{info.vendor_code}}</span>
      </div>
      <div class="amount" v-if="status.code === 0">
        <div class="num" v-if="info.credit === -1">暂无额度</div>
        <div class="rmb num" v-else>¥ {{info.credit | formatCurrency}}</div>
        <span class="text">信用总额度</span>
      </div>
      <div class="amount" v-else>
        <div class="rmb num">¥ {{info.amount | formatCurrency}}</div>
        <span class="text">项目总金额</span>
      </div>
    </div>
    <list-table-apply
      v-if="status.code === 0"
      :list="info.list || []"
      :idx="idx"
      :status="status"
      :vendorCode="info.vendor_code"
      :project-code="$store.getters.currentProjectCode"/>
    <list-table-check
      v-else
      :list="info.pay_request_list || []"
      :idx="idx"
      :status="status"
      :vendorCode="info.vendor_code"/>
  </div>
</template>

<script>
import ListTableApply from './project-table-apply'
import ListTableCheck from './project-table-check'

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
