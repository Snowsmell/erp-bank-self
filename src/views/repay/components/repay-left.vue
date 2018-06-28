<template>
  <app-main-left>
    <aside-search/>
    <aside-list
      :list="supplierList"
      :current="$store.getters.repaySupplierCode"
      :itemClik="handleItemClik"
      class="app-side-list"/>
    <!-- <aside-list-page/> -->
  </app-main-left>
</template>

<script>
import { AppMainLeft } from '@layout/components'
import { AsideSearch, AsideList, AsideListPage } from '@order/components'
import { SET_LOADING, SET_REPAY_SUPPLIER } from '@/store/mutation-types'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: {
    AppMainLeft,
    AsideSearch, AsideList, AsideListPage
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    supplierList() {
      let arr = []
      let list = this.list
      if (list.length > 0) {
        list.map(item => {
          const { amount, vendor_name, vendor_code } = item
          arr.push({
            itemId: vendor_code,
            title: vendor_name,
            desc: {
              text: 'ID',
              value: vendor_code
            },
            amount: {
              text: '待还款总金额',
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
      setLoading: SET_LOADING,
      setSupplier: SET_REPAY_SUPPLIER
    }),
    ...mapActions(['getRepayLoan', 'getRepayBank']),
    handleItemClik(index) {
      this.setSupplier(this.list[index])
      this.setLoading(true)
      Promise.all([this.getRepayLoan(), this.getRepayBank()])
        .then(res => this.setLoading(false))
    }
  }
}
</script>
