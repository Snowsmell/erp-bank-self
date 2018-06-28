<template>
  <div class="side-page">
    <i class="el-icon-arrow-up side-page-icon" @click="prePage"></i>
    <div class="side-page-num"><span>{{page+1}}/{{Math.ceil(tot/3)}} 页</span></div>
    <i class="el-icon-arrow-down side-page-icon" @click='nextPage'></i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 0
    }
  },
  props: ['tot', 'getPage'],
  methods: {
    prePage() {
      if (this.page > 0) {
        this.page--
        this.getPage(this.page)        
      }
    },
    nextPage() {
      if (this.page < Math.ceil(this.tot / 3) - 1) {
        this.page++
        this.getPage(this.page)
      }
    }
  }
}
</script>
