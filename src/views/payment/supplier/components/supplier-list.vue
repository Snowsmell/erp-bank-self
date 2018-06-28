<template>
  <div class="order-list">
    <list-item
      v-for="(item, index) in list"
      :key="item.project_code"
      :info="item"
      :idx="index"
      :status="status">
    </list-item>
  </div>
</template>

<script>
import ListItem from './supplier-list-item'

import {
  SET_SUPPLIER_SELECTED,
  SET_SUPPLIER_SELECTED_FALSE
} from '@/store/mutation-types'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ListItem
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currentSupplierCode: 'currentSupplierCode'
    }),
    status() {
      const num = this.$store.state.supplier.currentSupplierStatus
      const className = ['', 'warning', 'success', 'danger']
      const text = ['待申请', '审核中', '审核通过', '被驳回']
      return {
        code: num,
        message: text[num],
        class: className[num]
      }
    }
  },
  watch: {
    currentSupplierCode(val) {
      // 重置勾选
      this.setSupplierSelectedFalse([])
      this.setSupplierSelected()
    }
  },
  methods: {
    ...mapMutations({
      setSupplierSelected: SET_SUPPLIER_SELECTED,
      setSupplierSelectedFalse: SET_SUPPLIER_SELECTED_FALSE
    })
  },
  beforeDestroy() {
    // 重置勾选
    this.setSupplierSelectedFalse([])
    this.setSupplierSelected()
  }
}
</script>

