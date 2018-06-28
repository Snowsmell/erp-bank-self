<template>
<text-card>
  <div class="left" slot="header">
    <span class="title">银行账号信息</span>
  </div>
  <bank-table/>
</text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import BankTable from './repay-bank-table'

export default {
  components: {
    TextCard,
    BankTable
  }
}
</script>

