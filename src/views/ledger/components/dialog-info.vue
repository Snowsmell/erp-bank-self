<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    center
    width="800px"
    class="ledgerDialog">
    <el-form :model="dialogInfo">
      <el-row>
        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="下游企业名称(甲方)" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.cust_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="下游项目合同名称" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.project_contract_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="新增工地时间" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.new_site_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        
        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="项目合同编号" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.project_contract_code" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="项目合同金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.project_contract_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="供货日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.supply_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="确权日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.confirm_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="确权方" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.confirm_company" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="确权人" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.confirm_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="项目约定结算日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.pre_settle_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="实际结算日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.real_settle_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="项目约定回款日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.pre_recevie_fund_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="实际回款日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.real_recevie_fund_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="项目约定回款方式" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.pre_recevie_fund_channel" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="实际回款方式" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.real_recevie_fund_channel" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="商业汇票票号" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.draft_no" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="退票日期(增值税发票)" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.ticket_back_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="商业汇票票据到期日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.draft_end_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="回款金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.recevie_fund_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="对应增值税发票号码" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.vat_invoice_code" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="增值税发票开票日期" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.vat_invoice_issue_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="增值税发票金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.vat_invoice_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="对应上游采购合同签订日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.purchase_contract_sign_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="上游供应商名称" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.supplier_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="采购合同编号" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.purchase_contract_code" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="采购合同金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.purchase_contract_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="支付日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.pay_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="实际支付金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.real_pay_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="备注1" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.remark1" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="备注2" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.remark2" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="支付资金来源" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.payment_source" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="贷款日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.loan_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        
        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="贷款金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.loan_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="贷款期限(天)" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.loan_days" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="贷款到期日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.loan_end_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据备注" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.bh_remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="票据质押日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.bh_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据(来源工地)" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.bh_source" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据类型" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.bh_type" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据号(抵质押)" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.bh_no" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.bh_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据到期日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.bh_end_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据对应供应商名称" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.bh_supplier_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="是否质押放款" :label-width="formLabelWidth">
            <!-- <el-input v-model="dialogInfo.is_loan" auto-complete="off"></el-input> -->
            <el-switch
              v-model="dialogInfo.is_loan"
              style="margin-right: 8px" />
            {{dialogInfo.is_loan ? '是' : '否'}}
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据是否对应供应商" :label-width="formLabelWidth">
            <!-- <el-input v-model="dialogInfo.is_link_to_supplier" auto-complete="off"></el-input> -->
            <el-switch
              v-model="dialogInfo.is_link_to_supplier"
              style="margin-right: 8px" />
            {{dialogInfo.is_link_to_supplier ? '是' : '否'}}
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据托收回款日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.bh_receive_fund_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="质押票据托收回款金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.bh_receive_fund_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="归还贷款日" :label-width="formLabelWidth">
            <el-date-picker v-model="dialogInfo.refund_day" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :xl="12">
          <el-form-item label="归还贷款金额" :label-width="formLabelWidth">
            <el-input v-model="dialogInfo.refund_money" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogInfo',
  props: {
    title: {
      type: String,
      required: true
    },
    dialogVisible: {
      type: Boolean,
      required: true
    },
    dialogInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formLabelWidth: '180px'
    }
  },
  methods: {
    beforeClose() {
      this.$emit('dialogClose')
    },
    handleCancel() {
      this.$emit('dialogClose') 
    },
    handleUpdate() {
      this.$emit('dialogUpdate')
    }
  }
}
</script>
