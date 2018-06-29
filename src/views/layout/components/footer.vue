<template>
  <el-footer class="app-footer" height="64px">
    <slot name="check"></slot>
    <div class="check">
      <!-- <el-checkbox v-model="checkeALl">全选</el-checkbox> -->
      <!-- <span class="info"> | 已选择12项采购合同</span> -->
      <span class="info">已选择 {{ numbers }} 项</span>
    </div>
    <!-- <div class="check">
      <el-checkbox>全选</el-checkbox>
    </div> -->
    <div class="app-footer-right">
      <div class="info amount">
        <p class="blue rmb num">¥ {{amount | formatCurrency}}</p>
        {{text}}
      </div>
      <slot></slot>
      <!-- <el-button type="warning">拒绝</el-button>
      <el-button type="primary" class="w150">通过</el-button> -->
      <!-- <el-button type="primary" class="w150">申请重审</el-button> -->
    </div>
  </el-footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      list: state => state.common.selectedList
    })
  },
  props: {
    amount: {
      type: Number,
      required: true
    },
    text: String,
    numbers: {
      type: Number,
      default: 0
    }
  }
}
</script>

