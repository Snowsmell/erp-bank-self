<template>
<text-card class="tablerow" style="background:none">
  <transport-item
    v-if="transport.count > 0"
    v-for="(item, index) in transport.results"
    :key="item.transport_code + index"
    :info="item"
    :producer="item.producer"
    :confirmData="confirmList[index]"/>
  <div v-else>无数据</div>
</text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import TransportItem from './order-transport-item'
import {getTransportDetail2} from '@/api/order'

export default {
  components: {
    TextCard,
    TransportItem
  },
  props: {
    transport: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      confirmList: []
    }
  },
  mounted() {
    let orderId = this.$route.query.orderId 
    let payRequestId = this.$route.query.payId
    if (orderId) {
      getTransportDetail2({orderId}).then(res => {
        this.confirmList = res.data.results
      })
    } else {
      getTransportDetail2({payRequestId}).then(res => {
        this.confirmList = res.data.results
      })
    }
  }
}
</script>

