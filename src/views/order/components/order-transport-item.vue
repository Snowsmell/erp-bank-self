<template>
  <div class="order-list-item" style="background:#fff">
    <div class="order-list-header">
      <div class="info">
        <div class="name">运单号 <span class="text">{{info.transport_code}}</span></div>
        <div>收货日期 <span class="text">{{info.receive_date | formatTime}}</span></div>
      </div>
    </div>

    <!-- <order-material :info="info" :parseproducer="info.producer"/> -->
    <order-confirm :confirmData="confirmData" :title="'收货确权资料'"/>

    <template v-for="(item, index) in info.delivery_list">
      <div class="order-list-header" :key="'orderListHeader'+index">
        <div class="info">
          <div class="name">提单号 <span class="text">{{item.delivery_code}}</span></div>
          <div>收货日期 <span class="text">{{item.delivery_date | formatTime}}</span></div>
        </div>
      </div>
      <delivery-material :info="info.delivery_list[index]" :key="'Maertial'+index" :parseproducer="info.producer"/>
      <order-confirm :confirmData="confirmData.deliveries[index]" :title="'提货确权资料'" :key="index" />      
      
    </template>   


  </div>
</template>

<script>
import OrderTable from './order-transport-table'
import deliveryMaterial from './order-material-trans'
import OrderConfirm from './order-multipl-confirm'


export default {
  components: {
    OrderTable,
    OrderConfirm,
    deliveryMaterial
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    producer: {
      type: String
    },
    confirmData: {
      required: true,
      default: () => {
        return {
          deliveries: []
        }
      }
    }
  }
}
</script>

