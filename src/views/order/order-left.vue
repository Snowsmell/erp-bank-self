<template>
<app-main-left>
  <aside-search v-show="isShown"/>
  <component
    v-if="asideFilter"
    v-bind:is="asideFilter"
    :onchange="changeFilter">
  </component>
  <aside-list
    :list="payList"
    :current="payId"
    :itemClik="handleItemClik"
    :itemChecked="itemChecked"
    class="app-side-list"/>
  <!-- <aside-list-page/> -->
</app-main-left>
</template>

<script>
import { AppMainLeft } from '@layout/components'
import {
  AsideSearch,
  AsideList,
  AsideListPage,
  AsideApprovalFilter,
  SideListPagination
} from '@order/components'

import { SET_CURRENT_PAYMENT, SET_PAYMENT_SELECTED } from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    AppMainLeft,
    AsideSearch, AsideList, AsideListPage, SideListPagination,
    AsideApprovalFilter
  },
  data() {
    return {
      selectItem: []
    }
  },
  props: {
    asideFilter: {
      type: String
    },
    changeFilter: Function,
    itemChecked: Function
  },
  computed: {
    ...mapState({
      payId: state => Number(state.order.orderUrlQuery['payId']),
      paymentList: state => state.order.paymentList,
      isShown: state => state.order.isShown
    }),
    payList() {
      let arr = []
      let list = this.paymentList
      if (list.length > 0) {
        list.map(item => {
          const { request_code, pay_request_id, project_code, amount, vendor_name } = item
          arr.push({
            itemId: pay_request_id,
            title: request_code,
            desc: {
              text: '供应商',
              value: vendor_name
            },
            amount: {
              text: '申请单总金额',
              value: amount
            }
          })
        })
      }
      return arr
    }
  },
  methods: {
    ...mapMutations({
      setPayment: SET_CURRENT_PAYMENT,
      checkPayment: SET_PAYMENT_SELECTED
    }),
    handleItemClik(index) {
      let currentPay = this.paymentList[index]
      this.setPayment(currentPay)
      this.$router.replace({
        query: {
          payId: currentPay['pay_request_id'],
          vendorCode: currentPay['vendor_code']
        }
      })
    },
    handleCheck(index) {
      this.checkPayment(index)
    }
  }
}
</script>
