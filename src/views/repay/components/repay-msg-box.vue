<template>
  <div>
    <div class="item">还款项总数：{{count}} 笔</div>
    <div class="item mb2">还款总金额：¥ {{amount | formatCurrency}}</div>
    <div class="item">银行账户：¥ {{bank.bank_account_no | formatCurrency}}</div>
    <div class="item mb2">账户金额：¥ {{bank.bank_account_balance | formatCurrency}}</div>
    <div v-if="count === 1">
      <span>设置还款金额：</span>
      <input type="number" :value="amount" @input="updateAmount">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true
    },
    bank: {
      type: Object,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    updateAmount: Function
  }
}
</script>

