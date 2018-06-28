<template>
<text-card>
  <div class="left" slot="header">
    <span class="title">借据单信息</span>
  </div>
  <loan-table/>
  <list-page
    :total="$store.state.repay.repayLoanList.count"/>
</text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import LoanTable from './repay-loan-table'
import ListPage from './list-page'

export default {
  components: {
    TextCard,
    LoanTable,
    ListPage
  }
}
</script>

