<template>
  <div class="order-list">
    <list-item
      v-for="(item, index) in list"
      :key="item.vendor_code"
      :info="item"
      :idx="index"
      :status="status">
    </list-item>
  </div>
</template>

<script>
import ListItem from './project-list-item'

import {
  SET_PROJECT_SELECTED,
  SET_PROJECT_SELECTED_FALSE
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
      currentProjectCode: 'currentProjectCode'
    }),
    status() {
      const num = this.$store.state.project.currentProjectStatus
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
    currentProjectCode(val) {
      // 重置勾选
      this.setProjectSelectedFalse([])
      this.setProjectSelected()
    }
  },
  methods: {
    ...mapMutations({
      setProjectSelected: SET_PROJECT_SELECTED,
      setProjectSelectedFalse: SET_PROJECT_SELECTED_FALSE
    })
  },
  beforeDestroy() {
    // 重置勾选
    this.setProjectSelectedFalse([])
    this.setProjectSelected()
  }
}
</script>
