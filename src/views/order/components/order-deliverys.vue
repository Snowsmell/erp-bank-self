<template>
 
  <div class="order-list-item" >
    <template  v-for="(item, index) in deliveries">
      <div class="order-list-header" :key="'listheader-'+index" style="padding:0;margin-bottom:20px;background:#fff">
        <div class="info">
          <div class="name">提单号 <span class="text">{{item.code}}</span></div>
          <div class="date">提货日期 <span class="text">{{item.date | formatTime}}</span></div>
        </div>
      </div>
      <order-material :list="item.details || []" title="物资清单" :key="'wzqd-'+index"/>
      <order-confirm :confirmData="item" :title="'提货确权资料'" :key="'qqzl'+index"/>      
    </template>
  </div>

</template>

<script>
import OrderMaterial from './order-material'
import OrderConfirm from './order-multipl-confirm'

export default {
  components: {
    OrderMaterial,
    OrderConfirm
  },
  props: {
    deliveries: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  line-height: 45px;

  .name {
    color:#333;
    font-weight: 600;
    font-size: 16px;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    .text {
      font-weight: 400;
      color:#999;
      font-size: 14px;      
      padding: 0 10px;
    }
  }
  .date {
    background: #FBFBFB;
    padding: 10px 20px;    
  }
}
  
</style>
