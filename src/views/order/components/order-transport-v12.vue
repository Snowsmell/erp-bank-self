<template>
 
  <div class="order-list-item" >
    <div class="order-list-header" style="padding:0;margin-bottom:20px;background:#fff">
      <div class="info">
        <div class="name">运单号 <span class="text">{{transport.code}}</span></div>
        <div class="date">收货日期 <span class="text">{{transport.date | formatTime}}</span></div>
      </div>
    </div>

    <order-confirm :confirmData="this.transport" :title="'收货确权资料'"/>

  </div>
</template>

<script>
import OrderConfirm from './order-multipl-confirm'

export default {
  components: {
    OrderConfirm
  },
  props: {
    transport: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  line-height: 45px;
  
  .name{
    color:#333;
    font-weight: 600;
    font-size: 16px;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    .text{
      font-weight: 400;
      color:#999;
      font-size: 14px;      
      padding: 0 10px;
    }
  }
  .date{
    background: #FBFBFB;
    padding: 10px 20px;    
  }
}
  
</style>
