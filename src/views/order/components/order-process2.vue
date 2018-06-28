<template>
  <text-card class="order-process">
    <div class="left" slot="header">
      <span class="title">审批流程</span>
    </div>

    <el-steps :active="0" align-center finish-status="success">
      <el-step
        v-for="item in steps"
        :key="item.roleId"
        :title="item.role + ' ' + item.name"
        :status = "item.status"
        :description="item.date | formatTime('{y}/{m}/{d} {h}:{i}:{s}')">
      </el-step>
    </el-steps>

  </text-card>
</template>

<script>
import TextCard from '@/components/TextCard'

export default {
  components: {
    TextCard
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    steps() {
      const list = this.list
      let process = []
      if (list.length > 0) {
        let amount = (this.$store.state.order.currentPayment.amount || 0) * 100
        process = [
          {
            roleId: 2,
            role: '部门经理',
            name: '',
            date: '',
            status: ''
          }, {
            roleId: 7,
            role: '一级审批',
            name: '',
            date: '',
            status: ''
          }, {
            roleId: 8,
            role: '二级审批',
            name: '',
            date: '',
            status: ''
          }, {
            roleId: 9,
            role: '三级审批',
            name: '',
            date: '',
            status: ''
          }, {
            roleId: 6,
            role: '银行资金',
            name: '',
            date: '',
            status: ''
          }
        ]
        if (amount < 100000000) {
          process.splice(2, 2)
        }
        if (amount >= 100000000 && amount < 200000000) {
          process.splice(3, 1)
        }
        list.map((item, index) => {
          let current = process[index]
          if (current && current['roleId'] === item['role_id']) {
            current['name'] = item['user_name']
            current['date'] = item['date']
            item['status']['code'] > 0 ? current['status'] = 'success' : current['status'] = 'error'
          }
        })
      }
      return process
    }
  }
}
</script>
