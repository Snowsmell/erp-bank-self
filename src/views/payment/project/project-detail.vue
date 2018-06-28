<template>
<el-container direction="vertical">
  <app-header></app-header>

  <app-main v-loading.lock="$store.getters.loading">
    <order-detail/>
  </app-main>
  
</el-container>
</template>

<script>
import { AppHeader, AppMain } from '@layout/components'

import OrderDetail from '@order/order-detail'

export default {
  components: {
    AppHeader, AppMain,
    OrderDetail
  }
}
</script>
