<template>
  <el-dialog :title="title" :visible.sync="dialogInfoVisible" :before-close="beforeClose" center class="ledgerDialog">
    <div class="term"><span class="title">下游企业名称(甲方):</span><span class="detail">{{info.cust_name}}</span></div>
    <div class="term"><span class="title">下游项目合同名称:</span><span class="detail">{{info.project_contract_name}}</span></div>
    <div class="term"><span class="title">新增工地时间:</span><span class="detail">{{info.new_site_day | formatTime}}</span></div>
    <div class="term"><span class="title">项目合同编号:</span><span class="detail">{{info.project_contract_code}}</span></div>
    <div class="term"><span class="title">项目合同金额:</span><span class="detail">{{info.project_contract_money | formatCurrency}}</span></div>
    <div class="term"><span class="title">供货日:</span><span class="detail">{{info.supply_day | formatTime}}</span></div>
    <div class="term"><span class="title">确权日:</span><span class="detail">{{info.confirm_day | formatTime}}</span></div>
    <div class="term"><span class="title">确权方:</span><span class="detail">{{info.confirm_company}}</span></div>
    <div class="term"><span class="title">确权人:</span><span class="detail">{{info.confirm_name}}</span></div>
    <div class="term"><span class="title">项目约定结算日:</span><span class="detail">{{info.pre_settle_day | formatTime}}</span></div>
    <div class="term"><span class="title">实际结算日:</span><span class="detail">{{info.real_settle_day | formatTime}}</span></div>
    <div class="term"><span class="title">项目约定回款日:</span><span class="detail">{{info.pre_recevie_fund_day | formatTime}}</span></div>

    <div class="term"><span class="title">实际回款日:</span><span class="detail">{{info.real_recevie_fund_day | formatTime}}</span></div>
    <div class="term"><span class="title">项目约定回款方式:</span><span class="detail">{{info.pre_recevie_fund_channel}}</span></div>
    <div class="term"><span class="title">实际回款方式:</span><span class="detail">{{info.real_recevie_fund_channel}}</span></div>
    <div class="term"><span class="title">商业汇票票号:</span><span class="detail">{{info.draft_no}}</span></div>
    <div class="term"><span class="title">退票日期(增值税发票):</span><span class="detail">{{info.ticket_back_day | formatTime}}</span></div>
    <div class="term"><span class="title">商业汇票票据到期日:</span><span class="detail">{{info.draft_end_day | formatTime}}</span></div>
    <div class="term"><span class="title">回款金额:</span><span class="detail">{{info.recevie_fund_money | formatCurrency}}</span></div>
    <div class="term"><span class="title">对应增值税发票号码:</span><span class="detail">{{info.vat_invoice_code}}</span></div>
    <div class="term"><span class="title">增值税发票开票日期:</span><span class="detail">{{info.vat_invoice_issue_day | formatTime}}</span></div>
    <div class="term"><span class="title">增值税发票金额:</span><span class="detail">{{info.vat_invoice_money | formatCurrency}}</span></div>
    <div class="term"><span class="title">对应上游采购合同签订日:</span><span class="detail">{{info.purchase_contract_sign_day | formatTime}}</span></div>
    <div class="term"><span class="title">上游供应商名称:</span><span class="detail">{{info.supplier_name}}</span></div>

    <div class="term"><span class="title">采购合同编号:</span><span class="detail">{{info.purchase_contract_code}}</span></div>
    <div class="term"><span class="title">采购合同金额:</span><span class="detail">{{info.purchase_contract_money | formatCurrency}}</span></div>
    <div class="term"><span class="title">支付日:</span><span class="detail">{{info.pay_day | formatTime}}</span></div>
    <div class="term"><span class="title">实际支付金额:</span><span class="detail">{{info.real_pay_money | formatCurrency}}</span></div>
    <div class="term"><span class="title">备注1:</span><span class="detail">{{info.remark1}}</span></div>
    <div class="term"><span class="title">备注2:</span><span class="detail">{{info.remark2}}</span></div>
    <div class="term"><span class="title">支付资金来源:</span><span class="detail">{{info.payment_source}}</span></div>
    <div class="term"><span class="title">贷款日:</span><span class="detail">{{info.loan_day | formatTime}}</span></div>
    <div class="term"><span class="title">贷款金额:</span><span class="detail">{{info.loan_money | formatCurrency}}</span></div>
    <div class="term"><span class="title">贷款期限(天):</span><span class="detail">{{info.loan_days}}</span></div>
    <div class="term"><span class="title">贷款到期日:</span><span class="detail">{{info.loan_end_day | formatTime}}</span></div>
    <div class="term"><span class="title">质押票据备注:</span><span class="detail">{{info.bh_remark}}</span></div>

    <div class="term"><span class="title">票据质押日:</span><span class="detail">{{info.bh_day | formatTime}}</span></div>
    <div class="term"><span class="title">质押票据(来源工地):</span><span class="detail">{{info.bh_source}}</span></div>
    <div class="term"><span class="title">质押票据类型:</span><span class="detail">{{info.bh_type}}</span></div>
    <div class="term"><span class="title">质押票据号(抵质押):</span><span class="detail">{{info.bh_no}}</span></div>
    <div class="term"><span class="title">质押票据金额:</span><span class="detail">{{info.bh_money | formatCurrency}}</span></div>
    <div class="term"><span class="title">质押票据到期日:</span><span class="detail">{{info.bh_end_day | formatTime}}</span></div>
    <div class="term"><span class="title">质押票据对应供应商名称:</span><span class="detail">{{info.bh_supplier_name}}</span></div>
    
    <div class="term"><span class="title">是否质押放款:</span><span class="detail"  v-if="info.is_loan === 0">是</span><span class="detail" v-if="info.is_loan === 1">否</span></div>
    
    <div class="term"><span class="title">质押票据是否对应供应商:</span><span class="detail" v-if="info.is_link_to_supplier === 0">是</span><span class="detail" v-if="info.is_link_to_supplier === 1">否</span></div>
    <div class="term"><span class="title">质押票据托收回款日:</span><span class="detail">{{info.bh_receive_fund_day | formatTime}}</span></div>
    <div class="term"><span class="title">质押票据托收回款金额:</span><span class="detail">{{info.bh_receive_fund_money | formatCurrency}}</span></div>
    <div class="term"><span class="title">归还贷款日:</span><span class="detail">{{info.refund_day | formatTime}}</span></div>
    <div class="term"><span class="title">归还贷款金额:</span><span class="detail">{{info.refund_money | formatCurrency}}</span></div>

    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleCancel">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogInfoShow',
  props: {
    info: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    title: {
      type: String,
      required: true
    },
    dialogInfoVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    beforeClose() {
      this.$emit('dialogClose')
    },
    handleCancel() {
      this.$emit('dialogClose')  
    }
  }
}
</script>

<style lang="scss" scoped>
.term {
  padding: 10px 0;
}
.title {
  display: inline-block;
  width: 180px;
  text-align: right;
  margin-right: 10px;
}
</style>
