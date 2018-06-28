<template>
<text-card>
  <!-- 数据汇总 -->
  <div v-if="title" class="left" slot="header">
    <span class="title">{{title}}</span>
  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">下游合同签订日：</div>
      <div class="detail">{{info.sale_contract_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">新增工地时间：</div>
      <div class="detail">{{info.new_site_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">对应上游采购合同签订日：</div>
      <div class="detail">{{info.sale_contract_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">下游企业名称：</div>
      <div class="detail">{{info.customer_name}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">实际结算日：</div>
      <div class="detail">{{info.real_sale_settle_date | array0 | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">供货日：</div>
      <div class="detail">{{info.supply_date | array0 | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">下游项目合同：</div>
      <div class="detail">{{info.contract_code}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">实际付款日：</div>
      <div class="detail">{{info.real_contract_payment_date | array0 | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">确权日：</div>
      <div class="detail">{{info.revise_date | array0 | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同编号：</div>
      <div class="detail">{{info.contract_code}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">实际付款金额：</div>
      <div class="detail">¥ {{info.real_sale_contract_sum | formatCurrency}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">上游供应商名：</div>
      <div class="detail">{{info.vendor_name}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同金额：</div>
      <div class="detail">¥ {{info.sale_contract_sum | formatCurrency}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">实际付款方式：</div>
      <div class="detail">{{info.contract_payment}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">采购合同编号：</div>
      <div class="detail">{{info.order_contract_code}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同数量(吨)：</div>
      <div class="detail">{{info.contract_total}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">票据票号：</div>
      <div class="detail">{{info.bills | array0}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">采购合同订单号：</div>
      <div class="detail">{{info.order_contract_code}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">确权方：</div>
      <div class="detail">{{info.revise_person}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">票据到期日：</div>
      <div class="detail">{{info.bill_end_date | array0 | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">支付单编号：</div>
      <div class="detail">{{info.payment_code | array0 | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">确权人：</div>
      <div class="detail">{{info.revise_person}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">对应增值税发票号：</div>
      <div class="detail">{{info.receipts | array0}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">采购合同金额：</div>
      <div class="detail">¥ {{info.order_amount | formatCurrency}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目结算日：</div>
      <div class="detail">{{info.sale_settle_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">支付日：</div>
      <div class="detail">{{info.sale_pay_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目付款日：</div>
      <div class="detail">{{info.sale_pay_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">实际支付金额：</div>
      <div class="detail">¥ {{info.real_sale_contract_sum | formatCurrency}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">项目合同付款方式：</div>
      <div class="detail">{{info.real_contract_payment | array0}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">实际采购数量(吨)：</div>
      <div class="detail">{{info.real_contract_total}}</div>
    </el-col>
  </el-row>
  <div slot="footer">备注信息：{{info.remark}}</div>
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
      required: true,
      default() {
        return {}
      }
    },
    title: String
  }
}
</script>
