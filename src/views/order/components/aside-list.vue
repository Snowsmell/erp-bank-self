<template>
  <div v-if="list.length > 0" class="order-side-list">
    <div
      v-for="(item, index) in list"
      :key="item.itemId"
      :class="['order-side-list-item', item.itemId === current ? 'is-active' : '']"
      @click="itemClik(index)">
      <h3 class="title ellipsis">{{item.title}}</h3>
      <div class="desc">{{item.desc.text}}<span v-if="item.desc.value">：{{item.desc.value}}</span></div>
      <div class="amount-text">{{item.amount.text}}</div>
      <div class="clearfix">
        <span class="rmb amount">¥ {{item.amount.value | formatCurrency}}</span>
        <div class="status" v-if="item.status">
          <span :class="stateClass(item.status.code)">•</span> {{item.status.message}}
        </div>
        <div class="status" v-if="itemChecked">
          <el-checkbox @change="itemChecked(index)"/>
        </div>
      </div>
    </div>
  </div>
  <!-- {{aSideList[0]}} -->
  <div v-else class="order-side-list">
    <div class="no-data"><span>暂无数据</span></div>
  </div>
</template>

<script>
export default {
  name: 'SideList',
  props: {
    list: {
      type: Array,
      required: true
    },
    current: [String, Number],
    itemClik: Function,
    itemChecked: Function
  },
  methods: {
    stateClass(code) {
      const className = ['', 'warning', 'success', 'danger']
      return className[Number(code)]
    }
  },
  computed: {
    // 如果需要分页的话
    aSideList() {
      console.log(this.list)
      let arr = []
      let arr1 = []
      let count = 0
      for (let i = 0; i < this.list.length; i++) {
        if (count % 5 === 0) {
          arr.push(arr1)
          arr1 = []
        }
        count++
      }
      return arr
    }
  }
}
</script>
