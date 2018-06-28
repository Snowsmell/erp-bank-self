<template>
  <text-card>
    <div v-if="title" class="left" slot="header">
      <span class="title">{{title}}</span>
    </div>
    <record-table :tableData="tableData"></record-table>
    <slot></slot>
  </text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import RecordTable from './modify-record-table'

export default {
  components: {
    TextCard,
    RecordTable
  },
  props: {
    title: {
      type: String
    },
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
