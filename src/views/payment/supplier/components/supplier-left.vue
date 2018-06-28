<template>
  <app-main-left>
    <aside-search/>   
    <aside-list
      :list="supplierList"
      :current="$store.getters.currentSupplierCode"
      :itemClik="handleItemClik"
      :page="this.page"
      class="app-side-list"/>
      <!-- <aside-list-page :tot='supplierList.length' :getPage='getPage'/> -->
  </app-main-left>
</template>

<script>
import { AppMainLeft } from '@layout/components'
import { AsideSearch, AsideList, AsideListPage, SideListPagination } from '@order/components'
import { SET_LOADING, SET_CURRENT_SUPPLIER } from '@/store/mutation-types'
import { mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      page: 0
    }
  },
  components: {
    AppMainLeft,
    AsideSearch, AsideList, AsideListPage, SideListPagination
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
              text: '待申请总金额',
              value: amount
            },
            status: {
              message: '待申请',
              code: 0
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
      setSupplier: SET_CURRENT_SUPPLIER
    }),
    ...mapActions(['getSupplierDetail']),
    handleItemClik(index) {
      this.setSupplier(this.list[index])
      this.setLoading(true)
      this.getSupplierDetail().then(res => {
        this.setLoading(false)
      }).catch(err => {
        this.setLoading(false)
      })
    },
    getPage(data) {
      this.page = Number(data)
    }
  }
}
</script>
