<template>
<text-card class="order-receive">
  <div class="left" slot="header">
    <span class="title">{{ title }}</span>
  </div>
  <template v-if="list.length > 0">
    <div class="order-receive-left">
      <aside-list
        :list="transportList"
        current=""
        :itemClik="onTransportClick"
        class="transport-side-list">   
      </aside-list>
      <aside-list
        v-if="deliveryList.length > 0"
        :list="deliveryList"
        :current="currentDeliveryCode"
        :itemClik="onDeliveryClick"
        class="app-side-list">
      </aside-list>
      <div v-else class="no-data"><span>无数据</span></div>
    </div>

    <div class="order-receive-right">
      <div class="g-flex">
        <div class="g-flex-item">
          <order-user
            :border="false"
            :list="signUser"
            :title="signStatus"/>
        </div>
        <order-user
          :border="false"
          :list="realUser"
          :title="realStatus" />
      </div>

      <order-media
        :list="media"
        title="确权视频及图片"/>
    </div>
  </template>
  
  <div v-else class="no-data"><span>无数据</span></div>
  
</text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import { OrderUser, OrderMedia, AsideList } from '@order/components'

import { isType } from '@/utils'

export default {
  name: 'OrderReceiveCard',
  components: {
    TextCard,
    OrderUser,
    OrderMedia,
    AsideList
  },
  props: {
    title: String,
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      realUser: [],
      signUser: [],
      media: [],
      currentDeliveryCode: '',
      status: 1,
      signLength: 0
    }
  },
  watch: {
    list (val) {
      this.getCurrentInfo(this.list[0])
    }
  },
  computed: {
    transportList() {
      if (this.list.length > 0) {
        const { amount, code } = this.list[0]
        // this.getCurrentInfo(this.list[0])
        return [{
          itemId: code,
          title: code,
          desc: {
            text: '运单编号',
            value: ''
          },
          amount: {
            text: '运单金额',
            value: amount
          }
        }]
      }
      return []
    },
    deliveryList() {
      const delivery = []
      if (this.list.length > 0) {
        const list = this.list[0]['deliveries'] || []
        if (isType(list) && list.length > 0) {
          list.map(item => {
            const { code, amount } = item
            delivery.push({
              itemId: code,
              title: code,
              desc: {
                text: '提单编号',
                value: ''
              },
              amount: {
                text: '提单金额',
                value: amount
              }
            })
          })
        }
      }
      return delivery
    },
    realStatus() {
      return this.status === 1 ? '实际确认人' : '司机实际照片'
    },
    signStatus() {
      return this.status === 1 ? '合同规定确权人（' + this.signLength + '）人' : '物流司机（' + this.signLength + '）人'
    }
  },
  methods: {
    getCurrentInfo(info) {
      const { real_face, name, registered_face, registered_name, images } = info
      let signUser = []
      registered_face.map((item, index) => {
        signUser.push({
          url: item,
          name: registered_name[index]
        })
      })
      this.signUser = signUser
      this.signLength = this.signUser.length
      if (real_face) {
        this.realUser = [{
          url: real_face,
          name
        }]
      }
      this.media = images || []
    },
    onTransportClick(index) {
      this.status = 1
      this.getCurrentInfo(this.list[0])
      this.currentDeliveryCode = ''
    },
    onDeliveryClick(index) {
      this.status = 2
      const current = this.list[0]['deliveries'][index]
      this.getCurrentInfo(current)
      this.currentDeliveryCode = current['code']
    }
  }
}
</script>

