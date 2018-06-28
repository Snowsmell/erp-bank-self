<template>
<text-card class="tablerow">
  <!-- 项目合同 -->
  <div v-if="title" class="left" slot="header">
    <span class="title">{{title}}</span>
  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :xl="24">
      <div class="title">项目合同 <span>{{info.project_contract_code}}</span></div>
    </el-col>    
  </el-row>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">项目名称：</div>
      <div class="detail">{{info.project_name}}</div>
    </el-col>
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">项目合同金额(万)：</div>
      <div class="detail">¥ {{info.sale_contract_sum | formatCurrency}}</div>
    </el-col>      
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">项目合同签订日：</div>
      <div class="detail">{{info.project_date | formatTime}}</div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">甲方：</div>
      <div class="detail">{{info.cust_name}}</div>
    </el-col>
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">乙方：</div>
      <div class="detail">{{info.second_part}}</div>
    </el-col>   
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">备注：</div>
      <div class="detail">{{info.remark}}</div>
    </el-col>      
  </el-row>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">账期(天)：</div>
      <div class="detail">{{info.bill_period}}</div>
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
    },
    title: String
  }
}
</script>

