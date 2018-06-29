<template>
<text-card>
  <div class="left" slot="header">
    <span class="title">项目合同</span>
  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目编号：</div>
      <div class="detail">{{info.project_code}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目名称：</div>
      <div class="detail">{{info.project_name}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同金额：</div>
      <div class="detail">{{info.contract_sum}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同签订日：</div>
      <div class="detail">{{info.contract_date}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">甲方：</div>
      <div class="detail">{{info.parta}}</div>
    </el-col>
    
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">乙方：</div>
      <div class="detail">---</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">备注：</div>
      <div class="detail">---</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">帐期 (天)：</div>
      <div class="detail">{{info.payment_days}}</div>
    </el-col>
  </el-row>
</text-card>
</template>
<script>
import TextCard from '@/components/TextCard'
export default {
  components: {
    TextCard
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  }
}
</script>
