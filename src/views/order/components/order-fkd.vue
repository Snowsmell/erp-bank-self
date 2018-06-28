<template>
<text-card class="tablerow">
  <!-- 付款单 -->
  <div v-if="title" class="left" slot="header">
    <span class="title">{{title}}</span>
  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :xl="24">
      <div class="title">付款申请单 <span>{{info.request_code}}</span></div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">交付方式：</div>
      <div class="detail">{{info.pay_type}}</div>
    </el-col>    
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">收款单位：</div>
      <div class="detail">{{info.vendor_name}}</div>
    </el-col>
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">收款银行：</div>
      <div class="detail">{{info.bank_name}}</div>
    </el-col>    
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">收款帐号：</div>
      <div class="detail">{{info.bank_no}}</div>
    </el-col>
  </el-row>
  <el-row :gutter="20"> 
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">申请人：</div>
      <div class="detail">{{info.applicant}}</div>
    </el-col>    
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">申请时间：</div>
      <div class="detail">{{info.request_date | formatTime}}</div>
    </el-col>    
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">账期(天)：</div>
      <div class="detail">{{info.bill_period}}</div>
    </el-col>    
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">约定还款日:</div>
      <div class="detail">{{info.repay_date | formatTime}}</div>
    </el-col>    
  </el-row> 
  <el-row :gutter="20">
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">申请付款金额：</div>
      <div class="detail">¥ {{info.amount | formatCurrency}}</div>
    </el-col>
    <el-col :xs="12" :sm="8" :xl="6">
      <div class="term">备注:</div>
      <div class="detail">{{info.remark}}</div>
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

