<template>
  <data-list :flag="flag"/>
</template>

<script>
import DataList from '../dataList/index'

export default {
  components: {
    DataList
  },
  data() {
    return {
      // flag: 'approval'
    }
  },
  computed: {
    flag() {
      // console.log(1)
      // console.log(this.$route.fullPath)
      return 'approval'
    }
  }
}
</script>
