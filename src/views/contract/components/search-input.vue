<template>
  <el-input v-model="searchInput" :placeholder="placeholder" @change="writeText"></el-input>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      searchInput: null
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.contract.projectIsShow,
      placeholder: state => state.contract.placeholder
    })
  },
  methods: {
    ...mapMutations({
      searchContent: 'SET_CONTRACT_SEARCH_CONTENT'
    }),
    writeText() {
      this.searchContent(this.searchInput)
    }
  },
  destroyed() {
    this.searchContent(null)
  }
}
</script>
