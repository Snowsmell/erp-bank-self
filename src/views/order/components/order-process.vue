<template>
  <text-card class="order-process">
    <div class="left" slot="header">
      <span class="title">付款申请审核流程 (审核中)</span>
    </div>

    <el-steps :active="steps.length" align-center finish-status="success">
      <el-step
        v-for="item in process"
        :key="item.roleId"
        :status = "item.status"
        >
        <div slot="description">
          <div class="title">{{item.role}}</div>
          <div class="description">{{item.date ||"0000/00/00-00:00" | formatTime('{y}/{m}/{d} {h}:{i}:{s}') }}</div>
          <div class="title">{{item.name}} 
            <span>{{item.status}}</span>
          </div>
          <div class="description">{{item.message}}</div>
          
        </div>
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
      let list = this.list
      let step = []
      if (list.length > 0) {
        list.map(item => {
          let index = Number(item['role_id']) - 1
          step[index] = item
        })
      }
      return step
    },
    process() {
      let process = [
        {
          roleId: 1,
          role: '申请人',
          name: '',
          date: '',
          status: '',
          remark: ''
        }, {
          roleId: 2,
          role: '部门经理',
          name: '',
          date: '',
          status: '',
          remark: ''
        }, {
          roleId: 3,
          role: '财务会计',
          name: '',
          date: '',
          status: ''
        }, {
          roleId: 4,
          role: '财务台账',
          name: '',
          date: '',
          status: '',
          remark: ''
        }, {
          roleId: 5,
          role: '银行风控',
          name: '',
          date: '',
          status: '',
          remark: ''
        }
      ]
      if (this.list.length > 0) {
        this.steps.map((item, index) => {
          if (index < 5) {
            let current = process[index]
            if (item['role_id'] === current['roleId']) {
              current['name'] = item['user_name']
              current['date'] = item['date']
              current['remark'] = item['remark']
              item['status']['code'] > 0 ? current['status'] = 'success' : current['status'] = 'error'
            }
          }
        })
      }
      return process
    }
  }
}
</script>
