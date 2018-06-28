<template>
  <el-tabs :value="String($store.state.supplier.currentSupplierStatus)" @tab-click="handleClick" class="order-tabs">
    <el-tab-pane label="付款待申请" name="0"></el-tab-pane>
    <el-tab-pane label="审核中" name="1"></el-tab-pane>
    <el-tab-pane label="审核通过" name="2"></el-tab-pane>
    <el-tab-pane label="被驳回" name="3"></el-tab-pane>
  </el-tabs>
</template>
<script>
import { SET_LOADING, SET_CURRENT_SUPPLIER_STATUS } from '@/store/mutation-types'
import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING,
      setStatus: SET_CURRENT_SUPPLIER_STATUS
    }),
    ...mapActions(['getSupplierDetail']),
    handleClick(tab, event) {
      this.setStatus(Number(tab.name))
      this.setLoading(true)
      this.getSupplierDetail()
        .then(res => this.setLoading(false))
        .catch(err => this.setLoading(false))
    }
  }
}
</script>
