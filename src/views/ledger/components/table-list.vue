<template>
  <el-table
    :data="datalist"
    stripe
    @row-click.native="rowHandle"
    style="width: 100%">
    <el-table-column fixed prop="cust_name" label="下游企业名称(甲方)" width="180"></el-table-column>

    <el-table-column fixed prop="project_contract_name" label="下游项目合同名称" width="180"></el-table-column>

    <el-table-column label="新增工地时间" width="180">
      <template slot-scope="scope">
        {{scope.row.new_site_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column prop="project_contract_code" label="项目合同编号" width="180"></el-table-column>

    <el-table-column label="项目合同金额" width="180">
      <template slot-scope="scope">
        {{scope.row.project_contract_money | formatCurrency}}
      </template>
    </el-table-column>

    <el-table-column label="供货日" width="180">
      <template slot-scope="scope">
        {{scope.row.supply_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="确权日" width="180">
      <template slot-scope="scope">
        {{scope.row.confirm_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column prop="confirm_company" label="确权方" width="180"></el-table-column>

    <el-table-column prop="confirm_name" label="确权人" width="180"></el-table-column>

    <el-table-column label="项目约定结算日" width="180">
      <template slot-scope="scope">
        {{scope.row.pre_settle_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="实际结算日" width="180">
      <template slot-scope="scope">
        {{scope.row.real_settle_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="项目约定回款日" width="180">
      <template slot-scope="scope">
        {{scope.row.pre_recevie_fund_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="实际回款日" width="180">
      <template slot-scope="scope">
        {{scope.row.real_recevie_fund_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column prop="pre_recevie_fund_channel" label="项目约定回款方式" width="180"></el-table-column>

    <el-table-column prop="real_recevie_fund_channel" label="实际回款方式" width="180"></el-table-column>

    <el-table-column prop="draft_no" label="商业汇票票号" width="180"></el-table-column>

    <el-table-column label="退票日期（增值税发票）" width="180">
      <template slot-scope="scope">
        {{scope.row.ticket_back_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="商业汇票票据到期日" width="180">
      <template slot-scope="scope">
        {{scope.row.draft_end_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="回款金额" width="180">
      <template slot-scope="scope">
        {{scope.row.recevie_fund_money | formatCurrency}}
      </template>
    </el-table-column>

    <el-table-column prop="vat_invoice_code" label="对应增值税发票号码" width="180"></el-table-column>

    <el-table-column label="增值税发票开票日期" width="180">
      <template slot-scope="scope">
        {{scope.row.vat_invoice_issue_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="增值税发票金额" width="180">
      <template slot-scope="scope">
        {{scope.row.vat_invoice_money | formatCurrency}}
      </template>
    </el-table-column>

    <el-table-column label="对应上游采购合同签订日" width="180">
      <template slot-scope="scope">
        {{scope.row.purchase_contract_sign_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column prop="supplier_name" label="上游供应商名称" width="180"></el-table-column>

    <el-table-column prop="purchase_contract_code" label="采购合同编号" width="180"></el-table-column>

    <el-table-column label="采购合同金额" width="180">
      <template slot-scope="scope">
        {{scope.row.purchase_contract_money | formatCurrency}}
      </template>
    </el-table-column>

    <el-table-column label="支付日" width="180">
      <template slot-scope="scope">
        {{scope.row.pay_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="实际支付金额" width="180">
      <template slot-scope="scope">
        {{scope.row.real_pay_money | formatCurrency}}
      </template>
    </el-table-column>
    
    <el-table-column prop="remark1" label="备注1" width="180"></el-table-column>

    <el-table-column prop="remark2" label="备注2" width="180"></el-table-column>

    <el-table-column prop="payment_source" label="支付资金来源" width="180"></el-table-column>

    <el-table-column label="贷款日" width="180">
      <template slot-scope="scope">
        {{scope.row.loan_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="贷款金额" width="180">
      <template slot-scope="scope">
        {{scope.row.loan_money | formatCurrency}}
      </template>
    </el-table-column>

    <el-table-column prop="loan_days" label="贷款期限(天)" width="180"></el-table-column>

    <el-table-column label="贷款到期日" width="180">
      <template slot-scope="scope">
        {{scope.row.loan_end_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column prop="bh_remark" label="质押票据备注" width="180"></el-table-column>

    <el-table-column label="票据质押日" width="180">
      <template slot-scope="scope">
        {{scope.row.bh_day | formatTime}}
      </template>
    </el-table-column>
    
    <el-table-column prop="bh_source" label="质押票据(来源工地)" width="180"></el-table-column>

    <el-table-column prop="bh_type" label="质押票据类型" width="180"></el-table-column>

    <el-table-column prop="bh_no" label="质押票据号(抵质押)" width="180"></el-table-column>

    <el-table-column label="质押票据金额" width="180">
      <template slot-scope="scope">
        {{scope.row.bh_money | formatCurrency}}
      </template>
    </el-table-column>

    <el-table-column label="质押票据到期日" width="180">
      <template slot-scope="scope">
        {{scope.row.bh_end_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column prop="bh_supplier_name" label="质押票据对应供应商名称" width="180"></el-table-column>

    <el-table-column label="是否质押放款" width="180">
      <template slot-scope="scope">
        {{scope.row.is_loan ? '是' : '否'}}
        <!-- <span v-if="scope.row.is_loan === 0">是</span>
        <span v-if="scope.row.is_loan === 1">否</span> -->
      </template>
    </el-table-column>

    <el-table-column label="质押票据是否对应供应商" width="180">
      <template slot-scope="scope">
        {{scope.row.is_link_to_supplier ? '是' : '否'}}
        <!-- <span v-if="scope.row.is_link_to_supplier === 0">是</span>
        <span v-if="scope.row.is_link_to_supplier === 1">否</span> -->
      </template>
    </el-table-column>

    <el-table-column label="质押票据托收回款日" width="180">
      <template slot-scope="scope">
        {{scope.row.bh_receive_fund_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="质押票据托收回款金额" width="180">
      <template slot-scope="scope">
        {{scope.row.bh_receive_fund_money | formatCurrency}}
      </template>
    </el-table-column>

    <el-table-column label="归还贷款日" width="180">
      <template slot-scope="scope">
        {{scope.row.refund_day | formatTime}}
      </template>
    </el-table-column>

    <el-table-column label="归还贷款金额" width="180">
      <template slot-scope="scope">
        {{scope.row.refund_money | formatCurrency}}
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row.id, scope.$index)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
export default {
  name: 'TableList',
  props: {
    datalist: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleEdit(val) {
      this.$emit('handleEdit', val)
    },
    handleDelete($index, row) {
      this.$emit('handleDelete', $index, row)
    }
  }
}
</script>
