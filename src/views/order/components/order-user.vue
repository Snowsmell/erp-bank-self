<template>
<text-card :border="border" class="avatar-list">
  <div class="left" slot="header">
    <span class="title">{{ title }}</span>
  </div>
  <template v-if="list.length > 0">
    <user-item
      v-for="(item, index) in list"
      :url="item.url"
      :name="item.name"
      :key="index">
    </user-item>
  </template>
  <div v-else class="no-data"><span>暂无数据</span></div>
</text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import UserItem from './order-user-item'

export default {
  components: {
    TextCard,
    UserItem
  },
  props: {
    title: String,
    border: Boolean,
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.avatar-list{
  .text-card-bd{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

