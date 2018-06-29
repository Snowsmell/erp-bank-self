<template>
  <div v-if="isShow">    
    <order-header type="company" :info="supplierData" v-if="supplierData.title"></order-header>

    <order-fkd :info="infoSupplier" v-if=" !(JSON.stringify(infoSupplier) === '{}')">
    </order-fkd>
    
    <order-material :list="infoSupplier.details || []" title="物资清单" v-if="infoSupplier.details">
    </order-material>  

    <order-process
      v-if="isCheck && !isTransfer"
      :list="requestProcess || [{}]"
      title="审批流程"
      class="mb2" />
    <order-transfer-process
      v-if="isCheck && !isTransfer"
      :list="transProcess || [{}]"
      title="审批流程"
      class="mb2" />

    <order-xmht :info="infoXmht"></order-xmht>
    <project-info title="立项资料" class="order-project" :isShown="false"></project-info>

    <order-cght :info="infoCght">
    </order-cght>
    <order-material :list="infoCght.details || []" title="物资清单">
    </order-material>

    <project-info title="采购合同详情" class="order-project" :isShown="false"></project-info>

    <order-media
      v-if="infoMadie.length > 0"
      :list="infoMadie"
      title="图片资料" 
      class="mb2" />

    <!-- <order-transport
      :transport="infoTransport"/> -->

    <new-order-transport 
      :transport="infoTransport"
      v-if="infoTransport.id" />      

    <order-deliverys
      :deliveries="infoDeliveries"
      v-if="infoDeliveries"
    />
    
  
  </div>
  <div v-else class="no-data"><span>无数据</span></div>
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
} from './components'

import ProjectInfo from '@/views/contract/components/project-info'

import * as API from '@/api/order'
import {
  SET_LOADING,
  SET_ORDER_URL_QUERY,
  SET_CURRENT_PAYMENT,
  SET_PAYMENT_APPLICANT
} from '@/store/mutation-types'

import { mapMutations, mapActions, mapState } from 'vuex'
import { fileSuffix } from '@/utils'

export default {
  components: {
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
    ProjectInfo,
    newOrderTransport,
    OrderDeliverys
  },
  data() {
    return {
      routeName: this.$route.name,
      isPayment: false,
      isTransfer: false,
      isShow: false,
      infoSupplier: {},
      infoFkd: {},
      infoCght: {},
      infoXmht: {},
      infoSjhz: {},
      infoMadie: [],
      infoProcess: [],
      requestProcess: [],
      transProcess: [],
      infoTransport: {},      
      infoDeliveries: [],
      isApply: false,
      isCheck: false     
    }
  },
  computed: {
    ...mapState({
      currentSelect: state => state.common.selectedList
    }),
    supplierData() {
      const { vendor_name, vendor_code } = this.infoSupplier
      return {
        title: vendor_name || this.infoCght.vendor_name,
        desc: {
          text: '供应商ID',
          value: this.$route.query.vendorCode
        }
      }
    },
    cghtAttachments() {
      let attachments = this.infoCght.attachments
      if (attachments !== undefined) {
        for (let i = 0; i < attachments.length; i++) {
          if (fileSuffix(attachments[i].file_path) === 'pdf') {
            attachments.unshift(...attachments.splice(i, 1))
          }
        }
        return attachments
      }
      return attachments || []
    },
    xmhtAttachments() {
      let attachments = this.infoXmht.attachments
      if (attachments !== undefined) {
        for (let i = 0; i < attachments.length; i++) {
          if (fileSuffix(attachments[i].file_path) === 'pdf') {
            attachments.unshift(...attachments.splice(i, 1))
          }
        }
        return attachments
      }
      return attachments || []
    }
  },
  watch: {
    $route(val) {
      // 路由改变, 调用数据接口
      const query = val.query
      const { payId, orderId } = query
      const name = this.$route.name
      // 防止点击当前无参数的路由
      if ((!payId && !orderId) && name === this.routeName) {
        return false
      }
      this.initData(val.query)
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING,
      setQuery: SET_ORDER_URL_QUERY,
      setPayment: SET_CURRENT_PAYMENT,
      setApplicant: SET_PAYMENT_APPLICANT
    }),
    ...mapActions({
      newSetCurrentPayment: 'newSetCurrentAmount',
      resetList: 'setselectlist'
    }),
    // 无付款单
    getOrderData(orderId, vendorCode, projectCode) {
      const params = { orderId }
      const promise = Promise.all([
        API.getSupplierInfo(vendorCode),
        API.getOrderDetail(params),
        API.getTransportList(params)
      ])
      promise.then(res => {
        this.setLoading(false)
        this.infoSupplier = res[0].data
        this.infoCght = res[1].data
        this.infoTransport = res[2].data
        
        this.getSecondData({ projectCode }, vendorCode)
      })
      return promise
    },
    // 有付款单
    getOrderPayData(payRequestId, vendorCode) {
      const params = { payRequestId }
      const promise = Promise.all([
        API.getSupplierInfo(vendorCode),
        API.getPaymentDetail(payRequestId),
        API.getOrderDetail(params),
        this.$route.path.indexOf('transfer/check') !== -1 ? API.getTransferProcess(payRequestId) : API.getPaymentProcess(payRequestId),
        API.getTransportList(params)
      ])
      promise.then(res => {
        this.setLoading(false)
        this.infoSupplier = res[0].data
        this.infoFkd = res[1].data
        this.infoCght = res[2].data
        this.infoProcess = res[3].data.results
        this.infoTransport = res[4].data
        
        this.getSecondData(params, vendorCode)
        this.setApplicant(this.infoProcess[0].user_name)
      })
      return promise
    },
    // 提单信息
    getDeliveryData(deliveryId) {
      const params = { deliveryId }
      const promise = Promise.all([
        API.newGetDeliveryDetail(deliveryId)
      ])
      promise.then(res => {
        this.setLoading(false)
      })
      return promise
    },

    // v1.2 从付款单列表进入
    getRequestDetail(payId) {
      let promise = API.getrequestDetail(payId).then(res => {
        this.setLoading(false)
        this.infoSupplier = res.data.request
        this.requestProcess = res.data.request_process
        this.transProcess = res.data.transfer_process
        this.infoXmht = res.data.project
        this.infoCght = res.data.order
        this.infoTransport = res.data.transport
        this.infoDeliveries = res.data.deliveries
      })
      return promise
    },
    // v1.2 业务员发起申请进入
    getDeliveryDetail(deliveryId) {      
      let promise = API.newGetDeliveryDetail(deliveryId).then(res => {
        this.setLoading(false)        
        this.infoXmht = res.data.project
        this.infoCght = res.data.order
        this.infoTransport = res.data.transport
        this.infoDeliveries.push(res.data.delivery)      
      })
      return promise
    },    
    // v1.2 刷新后重置当前选择提单
    reset() {      
      if (this.currentSelect.length === 0) {   
        let current = {}
        if (this.isApply === true) {
          current = {
            'order_amount': this.infoCght.amount,
            'delivery_id': this.infoDeliveries[0].id   
          }          
        } else if (this.isCheck === true) {
          current = {
            'amount': this.infoSupplier.amount,
            'request_id': this.infoSupplier.id
          }
        }
        this.resetList([current])
      }
    },
    /**
     * 第2次请求数据
     * params = {projectCode | payRequestId}
     */
    getSecondData(params, vendorCode) {
      const promise = Promise.all([
        API.getProjectDetail(params),
        API.getProjectData({ vendorCode, ...params })
      ])
      promise.then(res => {
        this.infoXmht = res[0].data
        this.infoSjhz = res[1].data
      })
      return promise
    },
    // 默认请求的数据, 分2批次
    initData(query) {
      this.setLoading(true)
      this.setQuery(query)

      const { payId, orderId, vendorCode, projectCode, deliveryId } = query
      if (vendorCode && (orderId || payId || deliveryId)) {
        this.isShow = true
        if (payId) {
          console.log('payid' + payId)
          this.isCheck = true
          this.getRequestDetail(payId).then(res => {
            this.reset()
          })
        } else if (orderId) {
          console.log('order' + orderId).then(res => {
            this.reset()
          })        
        } else {
          console.log('delivery' + deliveryId)
          this.isApply = true
          this.getDeliveryDetail(deliveryId).then(res => {
            this.reset()
          })
        }
      }     
      this.setLoading(false)
    }
  },
  created() {
    // 组件加载, 执行 调用数据接口
    if (this.$route.path.indexOf('transfer/check') !== -1) {
      this.isTransfer = true
    }
    this.initData(this.$route.query)
  },
  beforeDestroy() {
    // 销毁之前 重置 store 中 state[currentPayment, orderUrlQuery]
    this.setLoading(false)
    this.setPayment({})
    this.setQuery({})
    this.setApplicant({})
  }
}
</script>

