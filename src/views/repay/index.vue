<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <repay-left :list="repaySupplierList"></repay-left>

      <app-main-right v-loading="$store.getters.loading">
        <order-header
          type="company"
          :info="supplierData"/>
        <repay-loan/>
        <repay-bank/>
      </app-main-right>
    </app-main>

    <app-footer
      text="已选总金额"
      :amount="selectAmount">
      <el-button type="primary" class="w150" @click="onRepay" :disabled="isDisabled">在线还款</el-button>
    </app-footer>

  </el-container>
</template>

<script>
import { AppHeader, AppFooter, AppMain, AppMainRight } from '@layout/components'
import { OrderHeader } from '@order/components'
import OrderDetail from '@order/order-detail'

import { postReceipt } from '@/api/order'
import { getRole } from '@/utils/auth'
import { mapState, mapMutations, mapActions } from 'vuex'
import { RepayLeft, RepayLoan, RepayBank } from './components'

export default {
  components: {
    AppHeader, AppFooter, AppMain, AppMainRight,
    OrderHeader,
    OrderDetail,
    RepayLeft, RepayLoan, RepayBank
  },
  data() {
    return {
      pageLoading: true,
      // 单笔输入金额
      oneAmount: 0,
      isDisabled: false
    }
  },
  computed: {
    ...mapState({
      repayLoanSelected: state => state.repay.repayLoanSelected,
      repayBankIndex: state => state.repay.repayBankIndex,
      repaySupplier: state => state.repay.repaySupplier,
      repaySupplierList: state => state.repay.repaySupplierList,
      repayLoanList: state => state.repay.repayLoanList,
      repayBankList: state => state.repay.repayBankList
    }),
    // 供应商 头部信息
    supplierData() {
      const { vendor_name, vendor_code, amount } = this.repaySupplier
      return {
        logo: 'http://static.mengqing.org/src/pic_360_360@2.jpg',
        title: vendor_name,
        desc: {
          text: 'ID',
          value: vendor_code
        },
        amount: {
          text: '待还款总额',
          value: amount
        },
        count: {
          text: '待还款借据总数',
          value: this.repayLoanList.count || 0
        }
      }
    },
    // 选择金额
    selectAmount() {
      let amount = 0
      let repayAmount = this.repayLoanSelected
      if (repayAmount.length > 0) {
        repayAmount.map(item => {
          amount += Number(item.amount)
        })
      }
      return amount
    },
    // 选择银行
    selectBank() {
      return this.repayBankList.results[this.repayBankIndex]
    }
  },
  methods: {
    ...mapMutations({search: 'SET_REPAY_SEARCH'}),
    ...mapActions(['getRepaySupplier', 'getRepayLoan', 'getRepayBank']),
    async getAllData() {
      this.search('repay')
      let list = await this.getRepaySupplier()
      Promise.all([this.getRepayLoan(), this.getRepayBank()]).then(res => {
        this.pageLoading = false
      })
      getRole() === 99 ? this.isDisabled = true : this.isDisabled = false
    },
    // 剩余金额
    getLoanBalance() {
      let amount = 0
      let repayAmount = this.repayLoanSelected
      if (repayAmount.length > 0) {
        repayAmount.map(item => {
          amount += Number(item.balance)
        })
      }
      return amount
    },
    // 提交确认框
    confirmBox() {
      const h = this.$createElement
      this.$msgbox({
        title: '确认还款',
        message: h('repay-msg-box', {
          props: {
            amount: this.selectAmount,
            bank: this.selectBank,
            count: this.repayLoanSelected.length,
            updateAmount: this.updateAmount
          }
        }),
        closeOnClickModal: false,
        showCancelButton: false,
        confirmButtonText: '确认还款',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.handleRepay(instance, done)
          } else {
            done()
          }
        }
      }).catch(err => {
        // console.log('取消还款...')
      })
    },
    // 验证提交还款数据
    verifyRepayAmount() {
      // console.log('选择金额： ', this.selectAmount)
      // console.log('书写金额： ', this.oneAmount)
      // console.log('银行账户余额: ', this.selectBank.bank_account_balance)
      // console.log('剩余金额: ', this.getLoanBalance())

      let repayAmount = this.selectAmount
      if (this.repayLoanSelected.length === 1) {
        if (!this.oneAmount || this.oneAmount <= 0) {
          this.$message.error('请填写正确的还款金额！')
          return false
        }
        repayAmount = this.oneAmount
      }
      if (repayAmount > this.selectBank.bank_account_balance) {
        this.$message.error('银行账户余额不足!')
        return false
      }
      if (repayAmount > this.getLoanBalance()) {
        this.$message.error('剩余金额不足!')
        return false
      }
      return true
    },
    // 格式化还款数据
    formatPostData(bank, loanList) {
      const { bank_account_no } = bank
      let loanArr = []
      if (loanList.length === 1) {
        loanArr = [{
          amount: this.oneAmount,
          receipt_no: loanList[0]['receipt_code']
        }]
      } else {
        loanList.map(item => {
          loanArr.push({
            amount: item['amount'],
            receipt_no: item['receipt_code']
          })
        })
      }
      return {
        bank_account_no,
        receipts: loanArr
      }
    },
    // 发起在线还款
    onRepay() {
      let repayAmount = this.repayLoanSelected
      this.oneAmount = this.selectAmount
      if (repayAmount.length === 0) {
        return this.$message.error('请选择还款金额！')
      }
      if (this.repayBankIndex === -1) {
        return this.$message.error('请选择还款银行账号信息！')
      }
      this.confirmBox()
    },
    // 操作还款
    handleRepay(btn, done) {
      // this.selectBank
      // this.repayLoanSelected
      if (this.verifyRepayAmount()) {
        btn.confirmButtonLoading = true
        btn.confirmButtonText = '还款中...'
        
        let postData = this.formatPostData(this.selectBank, this.repayLoanSelected)
        postReceipt(postData).then(res => {
          if (res.code === 0) {
            btn.confirmButtonLoading = false
            done()
            this.$message({
              message: '恭喜你，还款成功 !',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push('/refresh')
            }, 500)
          }
        }).catch(err => {
          console.info('还款失败 : ', err.response)
          btn.confirmButtonLoading = false
          done()
          if (err.response.data.code === 500) {
            btn.confirmButtonLoading = false
            done()
            this.$message({
              message: err.response.data.message,
              type: 'error'
            })
          }
        })
      }
    },
    // 更新单笔金额
    updateAmount(e) {
      this.oneAmount = Number(e.target.value)
    }
  },
  mounted() {
    this.getAllData()
  }
}
</script>
