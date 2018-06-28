<template>
<text-card>
  <!-- 项目合同 -->
  <div v-if="title" class="project-detail" slot="header">
    <span class="title">{{title}}</span>
  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同编号：</div>
      <div class="detail">{{info.project_contract_code}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目名称：</div>
      <div class="detail">{{info.project_name}}</div>
    </el-col>
    <!-- <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">甲方：</div>
      <div class="detail">{{info.customer_name}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">乙方：</div>
      <div class="detail">{{info.second_part}}</div>
    </el-col> -->
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同签订日：</div>
      <div class="detail">{{info.salecontractdate | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同金额：</div>
      <div class="detail">¥ {{info.salecontractsum | formatCurrency}}</div>
    </el-col>
  </el-row>
</text-card>
</template>

<script>
import TextCard from '@/components/TextCard'

export default {
  name: 'ProDetail',
  components: {
    TextCard
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    title: String
  }
}
</script>

