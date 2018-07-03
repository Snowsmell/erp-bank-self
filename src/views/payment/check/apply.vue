<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">

    <div v-if="isShow">
      <order-header type="company" :info="supplierData" v-if="supplierData.title"></order-header>
    </div>
    
    <el-main class="is-full">
      <div v-if="isShow">    
        <order-fkd :info="infoSupplier" v-if=" !(JSON.stringify(infoSupplier) === '{}')">
        </order-fkd>
        
        <order-material :list="infoSupplier.details || []" title="物资清单" v-if="infoSupplier.details">
        </order-material>  

        <order-process
          v-if="isPayment && !isTransfer"
          :list="requestProcess || [{}]"
          title="审批流程"
          class="mb2" />
        <order-transfer-process
          v-if="isPayment && !isTransfer"
          :list="transProcess || [{}]"
          title="审批流程"
          class="mb2" />

        <order-xmht :info="infoXmht || {}"></order-xmht>
        <picture-data  title="立项资料" class="order-project"></picture-data>

        <order-cght :info="infoCght || {}">
        </order-cght>
        <order-material :list="infoCght.details || []" title="物资清单">
        </order-material>

        <picture-data  title="立项资料" class="order-project"></picture-data>

        <order-media
          v-if="infoMadie.length > 0"
          :list="infoMadie"
          title="图片资料" 
          class="mb2" />

        <new-order-transport 
          :transport="infoTransport"
          v-if="infoTransport.id" />      

        <order-deliverys
          :deliveries="infoDeliveries"
          v-if="infoDeliveries"
        />
        
      </div>
      <div v-else class="no-data"><span>无数据</span></div>
    </el-main>
    <detail-footer
      text="金额合计"
      :amount="$store.getters.commonAmount">
      <el-button 
        type="primary" 
        @click="payRequest" 
        :disabled="isDisabled">申请付款
      </el-button>
    </detail-footer>

  </el-container>
</template>

<script>
import {
  Company,
  OrderHeader,
  OrderFkd,
  OrderCght,
  OrderXmht,
  OrderSjhz,
  OrderMaterial,
  OrderJjd,
  OrderMedia,
  OrderPicture,
  OrderProcess,
  OrderTransport,
  OrderTransferProcess,
  newOrderTransport,
  OrderDeliverys
} from '@order/components'
import { PictureData, DetailFooter } from '@/views/detailLayout/components'

import { mapMutations, mapActions, mapState } from 'vuex'
import { newGetDeliveryDetail, launchPayRequest } from '@/api/order'
import { getRole } from '@/utils/auth'
import { getQueryObject } from '@/utils/index'

export default {
  components: {
    DetailFooter,
    Company,
    OrderHeader,
    OrderFkd,
    OrderCght,
    OrderXmht,
    OrderSjhz,
    OrderMaterial,
    OrderJjd,
    OrderMedia,
    OrderPicture,
    OrderProcess,
    OrderTransport,
    OrderTransferProcess,
    newOrderTransport,
    OrderDeliverys,
    PictureData
  },
  data() {
    return {
      pageLoading: false,
      isDisabled: false,
      isShow: false,
      isPayment: false,
      infoSupplier: {},
      requestProcess: [],
      transProcess: [],
      infoXmht: {},
      infoCght: {},
      infoMadie: [],
      infoTransport: {},
      infoDeliveries: [],
      param: {}
    }
  },
  computed: {
    supplierData() {
      const { vendor_name, vendor_code } = this.infoSupplier
      return {
        title: vendor_name || this.infoCght.vendor_name,
        desc: {
          text: '供应商ID',
          value: this.param.vendorCode
        }
      }
    }
  },
  methods: {
    
    initData() {
      this.pageLoading = true
      this.param = getQueryObject(window.location.href)

      newGetDeliveryDetail(this.param.deliveryId).then(res => {
        this.isShow = true
        this.pageLoading = false
        if (res.code === 0) {
          this.infoXmht = res.data.project
          this.infoCght = res.data.order
          this.infoTransport = res.data.transport
          this.infoDeliveries.push(res.data.delivery) 
        }
        console.log(res)
      })



      getRole() === 99 ? this.isDisabled = true : this.isDisabled = false
    },
    payRequest() {
      let payRequestJson = {
        deliveries: [this.param.deliveryId]
      }
      launchPayRequest(payRequestJson).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } 
      }).catch(err => {
        if (err.response.data.code === 500) {
          this.$message({
            message: err.response.data.message,
            type: 'error'
          })
        }
      })
    }    
  },
  mounted() {
    this.initData()
  }
}
</script>
<style >
.el-button{
  font-size: 20px;
}
</style>
