<template>
<text-card>
  <!-- 借据单 -->
  <div v-if="title" class="left" slot="header">
    <span class="title">{{title}}</span>
  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">借据号：</div>
      <div class="detail">{{info.receipt_code}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">&nbsp;</div>
      <div class="detail">&nbsp;</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">供应商名称：</div>
      <div class="detail">{{info.vendor_name}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">是否结清：</div>
      <div class="detail">{{info.is_settle ? '是' : '否'}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">发放日：</div>
      <div class="detail">{{info.start_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">付息方式：</div>
      <div class="detail">{{info.repay_rate_type}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">到期日：</div>
      <div class="detail">{{info.end_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">收息模式：</div>
      <div class="detail">{{info.repay_model}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">币总：</div>
      <div class="detail">{{info.currency_type}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">还款状态：</div>
      <div class="detail">{{repayStatus}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">借据金额：</div>
      <div class="detail">¥ {{info.debet_amt | formatCurrency}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">贷款号：</div>
      <div class="detail">{{info.loan_no}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">借据余额：</div>
      <div class="detail">¥ {{info.debet_balance | formatCurrency}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">利率：</div>
      <div class="detail">{{info.rate}}％</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">融资期限：</div>
      <div class="detail">{{info.loan_days}} 天</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">应收账款总金额：</div>
      <div class="detail">¥ {{info.debet_amt | formatCurrency}}</div>
    </el-col>
  </el-row>
</text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import { isType } from '@/utils'

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
  },
  computed: {
    repayStatus() {
      const status = this.info.repay_status
      return isType(status) === 'object' ? status['message'] : ''
    }
  }
}
</script>

