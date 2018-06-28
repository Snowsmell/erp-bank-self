<template>
  <div class="order-side-list-item" @click="handleClick(itemId)">
    <h3 class="title ellipsis">{{title}}</h3>
    <div class="desc">{{desc.text}}：{{desc.value}}</div>
    <div class="amount-text">{{amount.text}}</div>
    <div class="clearfix">
      <span class="rmb amount">¥ {{amount.value | formatCurrency}}</span>
      <div v-if="status" class="status"><span :class="stateClass">•</span> {{status.message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideListItem',
  props: {
    itemId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: Object,
      required: true
    },
    amount: {
      type: Object,
      required: true
    },
    status: Object,
    itemClik: Function
  },
  computed: {
    stateClass() {
      const className = ['', 'warning', 'success', 'danger']
      return className[Number(this.status.code)]
    }
  },
  methods: {
    handleClick(code) {
      this.itemClik(code)
    }
  }
}
</script>
