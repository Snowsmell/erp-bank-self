<template>
<div class="order-header">
  <div class="info">
    <div class="ellipsis name">{{info.title}}</div>
    <span class="text">{{info.desc.text}}: {{info.desc.value}}</span>
  </div>
  <div class="block">
    <div>供应商信用额度</div>
    <div class="money">￥{{credit.credit | formatCurrency}}</div>
  </div>
  <div class="block">
    <div>占用额度</div>
    <div class="money">￥{{credit.occupied | formatCurrency}}</div>
  </div>
  <div class="block">
    <div>信用余额</div>
    <div class="money"
    >￥{{credit.remain | formatCurrency}}</div>
  </div>    
  <!-- <div class="amout">
    <span class="text">{{info.amount.text}}</span>
    <div class="num" v-if="info.amount.value === -1">暂无额度</div>
    <div class="rmb num" v-else>¥ {{info.amount.value | formatCurrency}}</div>
  </div>
  <div class="count">
    <span class="text">{{info.count.text}}</span>
    <div class="rmb num">{{info.count.value}}</div>
  </div> -->
</div>
</template>

<script>

import { getVendorCredit } from '@/api/order'

export default {

  data() {
    return {
      credit: {}
    }
  },  
  props: {
    type: {
      type: String,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  mounted() {
    let vendor = this.info.title
    getVendorCredit(vendor).then(res => {
      this.credit = { ...res.data }
    })
  }
}
</script>

