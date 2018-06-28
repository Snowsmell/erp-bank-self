<template>
<el-container
  direction="vertical"
  v-loading="pageLoading"
  element-loading-text="正在加载数据...">
  <app-header></app-header>

  <app-main>
    <order-jjd
      v-if="isReceive"
      :info="infoReceive"
      title="借据单"
      class="mb2">
    </order-jjd>

    <order-fkd
      v-if="isPayment"
      :info="infoFkd"
      title="付款申请单">
    </order-fkd>
    <!-- <order-media
      :list="media"
      title="项目资料">
    </order-media> -->
    <order-material
      v-if="isPayment"
      :list="infoFkd.material_list || []"
      title="物资清单"
      class="mb2">
    </order-material>

    <!-- <order-cght :info="infoCght" title="采购合同">
    </order-cght>
    <order-material :list="infoCght.material_list || []" title="物资清单" class="mb2">
    </order-material>
    <order-xmht :info="infoXmht" title="项目合同" class="mb2">
    </order-xmht> -->
    <!-- <order-sjhz :info="infoSjhz" title="数据汇总" class="mb2">
    </order-sjhz> -->

    <order-receive :list="infoTransport" title="提货/收货 确权信息"/>

  </app-main>
  
</el-container>
</template>

<script>
import { AppHeader, AppMain, AppFooter } from '@layout/components'
import {
  Company,
  OrderFkd,
  OrderCght,
  OrderXmht,
  // OrderSjhz,
  OrderMaterial,
  OrderJjd,
  OrderMedia,
  OrderProcess,
  OrderTransport,
  OrderReceive
} from './components'

import * as API from '@/api/order'
import { isType } from '@/utils'

export default {
  components: {
    AppHeader, AppMain, AppFooter,
    Company,
    OrderFkd,
    OrderCght,
    OrderXmht,
    // OrderSjhz,
    OrderMaterial,
    OrderJjd,
    OrderMedia,
    OrderProcess,
    OrderTransport,
    OrderReceive
  },
  data() {
    return {
      pageLoading: false,
      isPayment: false,
      isReceive: false,
      infoReceive: {},
      infoFkd: {},
      infoCght: {},
      infoXmht: {},
      // infoSjhz: {},
      infoTransport: []
      // media: []
    }
  },
  methods: {
    // 获取存在付款单
    getOrderPayData(query) {
      const { vendorCode, payId } = query
      const params = { payRequestId: payId }
      const promise = Promise.all([
        API.getPaymentDetail(payId),
        API.getOrderDetail(params),
        API.getProjectDetail(params),
        API.getProjectData({ vendorCode, ...params }),
        API.getTransportDetail2(params)
      ])
      promise.then(res => {
        this.infoFkd = res[0].data
        this.infoCght = res[1].data
        this.infoXmht = res[2].data
        // this.infoSjhz = res[3].data
        this.infoTransport = res[4].data.results || []
      })
      return promise
    },
    // 获取不存在付款单
    getOrderData(query) {
      const { orderId, projectCode, vendorCode } = query
      const params = { orderId }
      const promise = Promise.all([
        API.getOrderDetail(params),
        API.getProjectDetail({ projectCode }),
        API.getProjectData({ projectCode, vendorCode }),
        API.getTransportDetail2(params)
      ])
      promise.then(res => {
        this.infoCght = res[0].data
        this.infoXmht = res[1].data
        // this.infoSjhz = res[2].data
        this.infoTransport = res[3].data.results || []
      })
      return promise
    },
    // 获取存在借据 (必有付款单)
    getReceiveData(query) {
      const { payCode, receiptCode } = query
      const promise = Promise.all([
        this.getOrderPayData(query),
        API.getReceiptDetail2(receiptCode, payCode)
      ])
      promise.then(res => {
        this.infoReceive = res[1].data
      })
      return promise
    },
    initData(query) {
      const { payId, receiptCode } = query
      return new Promise((resolve, reject) => {
        if (receiptCode) {
          this.isReceive = true
          this.isPayment = true
          this.getReceiveData(query).then(res => {
            resolve()
          })
        } else {
          if (payId) {
            this.isPayment = true
            this.getOrderPayData(query).then(res => {
              resolve()
            })
          } else {
            this.getOrderData(query).then(res => {
              resolve()
            })
          }
        }
      })
    }
  },
  created() {
    this.pageLoading = true
    this.initData(this.$route.query).then(res => {
      this.pageLoading = false
    })
  }
}
</script>
