<template>
  <el-footer class="app-footer" height="64px">
    <slot name="check"></slot>
    <div class="app-footer-right">
      <div class="info amount">
        <p class="blue rmb num">¥ {{amount | formatCurrency}}</p>
        {{text}}
      </div>
      <slot></slot>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: 'DetailFooter',
  props: {
    amount: {
      type: Number,
      default: 0
    },
    text: String
  }
}
</script>

