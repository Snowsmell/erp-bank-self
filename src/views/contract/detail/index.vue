<template>
  <el-container
  direction="vertical"
  v-loading="pageLoading"
  element-loading-background="rgba(255, 255, 255, 0.92)"
  element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <contract-project
        v-if="ascription === '1'"
        :info="contractInfo"
        style="margin-bottom: 16px" />
      <contract-purchase
        v-if="ascription === '2'"
        :info="contractInfo"
        style="margin-bottom: 16px" />

      <project-info title="立项资料" class="marginBtn"></project-info>

      <modify-record title="资料修改记录" :tableData="tableData">
        <el-row type="flex" justify="end">
          <table-page :total="Number.parseInt(recordTotal)" :pageSize="Number.parseInt(recordPage)"></table-page>
        </el-row>
      </modify-record>
      
    </app-main>

    <el-footer class="app-footer" height="64px">
      <div class="app-footer-right">
        <el-button type="primary" @click="savePro">提交</el-button>
      </div>
    </el-footer>

    <confirm-person></confirm-person>
  </el-container>
</template>

<script>
import { AppHeader, AppMain } from '@layout/components'
import { ContractInfo, ProjectInfo, ModifyRecord, TablePage, ConfirmPerson, ContractProject, ContractPurchase } from '../components'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { saveSeal } from '@/api/contract'
import Cookies from 'js-cookie'

export default {
  components: {
    AppHeader, AppMain,
    ContractInfo, ProjectInfo,
    ModifyRecord,
    TablePage,
    ConfirmPerson,
    ContractProject,
    ContractPurchase
  },
  computed: {
    ...mapState({
      pictureList: state => state.contract.pictureList,
      mediaList: state => state.contract.mediaList,
      pdfList: state => state.contract.pdfList,
      tableData: state => state.contract.recordList || [],
      fileId: state => state.contract.recordId || null,
      pageLoading: state => state.contract.loading,
      ascription: state => state.contract.ascription,
      conType: state => state.contract.contractType,
      contractInfo: state => state.contract.tableListQuery,
      recordPage: state => state.contract.recordPage,
      recordTotal: state => state.contract.recordTotal,
      getTip: state => state.contract.setTip,
      confirmInfos: state => state.contract.confirmInfos
    }),
    ...mapGetters({
      proStartTime: 'proStartTime',
      secondName: 'secondName',
      proEndTime: 'proEndTime'
    }),
    title() {
      if (this.ascription === '1') {
        return '项目合同信息'
      } else {
        return '采购合同信息'
      }
    }
  },
  watch: {
    getTip: function() {
      if (this.getTip === '1000012' || this.getTip === '2000012') {
        this.dialogVisible(false)
        this.dialogConfirm(true)
      }
    }
  },
  methods: {
    ...mapMutations({
      setRecord: 'SET_CONTRACT_RECORD',
      reset: 'SET_CONTRACT_REST',
      setTip: 'SET_CONTRACT_TIP',
      clearId: 'SET_CONTRACT_RECORD_ID',
      proNo: 'SET_CONTRACT_PRONO',
      clearContractType: 'SET_CONTRACT_TYPE',
      setContractInfo: 'SET_CONTRACT_QUERY',
      setAscription: 'SET_CONTRACT_ASCRIPTION',
      show: 'SET_CONTRACT_PROJECT_ISSHOW',
      dialogConfirm: 'SET_CONTRACT_CONFIRM',
      dialogVisible: 'SET_CONTRACT_DIALOG_VISIBLE'
    }),
    ...mapActions(['getCategorys', 'backShowImg']),
    initData() {
      if (this.ascription === '2') {
        this.setTip('1000009')
      }
      this.reset([])
      this.changeCookie()
      
      this.proNo(this.contractInfo.project_code)
      this.getCategorys(this.ascription)
      this.backShowImg()
    },
    async savePro() {
      const contractType = {}
      for (var item in this.conType) {
        contractType[this.conType[item]] = item
      }

      const {contract_code, contract_date, contract_sum, parta, payment_days, project_code, project_name, update_time, apply_user} = this.contractInfo
      let attachs = []
      if (this.pictureList.length > 0) {
        for (let i = 0; i < this.pictureList.length; i++) {
          attachs.push({
            'file_type': contractType[this.pictureList[i].name] || this.pictureList[i].file_type,
            'file_path': this.pictureList[i].abstract_path,
            'attach_id': this.pictureList[i].attach_id || null,
            'confirm_name': '',
            'confirm_phone': '',
            'confirm_id_no': '',
            'file_type_name': ''
          })
        }
      }

      if (this.mediaList.length > 0) {
        for (let i = 0; i < this.mediaList.length; i++) {
          attachs.push({
            'file_type': contractType[this.mediaList[i].name] || this.mediaList[i].file_type,
            'file_path': this.mediaList[i].abstract_path,
            'attach_id': this.mediaList[i].attach_id || null,
            'confirm_name': '',
            'confirm_phone': '',
            'confirm_id_no': '',
            'file_type_name': ''
          })
        }
      }
      
      if (this.pdfList.length > 0) {
        for (let i = 0; i < this.pdfList.length; i++) {
          attachs.push({
            'file_type': contractType[this.pdfList[i].name] || this.pdfList[i].file_type,
            'file_path': this.pdfList[i].abstract_path,
            'attach_id': this.pdfList[i].attach_id || null,
            'confirm_name': '',
            'confirm_phone': '',
            'confirm_id_no': '',
            'file_type_name': ''
          })
        }
      }

      if (this.confirmInfos.length > 0) {
        for (let j = 0; j < this.confirmInfos.length; j++) {
          let arr = this.confirmInfos[j].attachs
          console.log(arr)
          for (let i = 0; i < arr.length; i++) {
            attachs.push({
              'file_type': arr[i].file_type,
              'file_path': arr[i].review_path,
              'attach_id': arr[i].id || null,
              'confirm_name': arr[i].confirm_name,
              'confirm_phone': arr[i].confirm_phone,
              'confirm_id_no': arr[i].confirm_id_no,
              'file_type_name': arr[i].file_type_name
            })
          }
        }
      }

      if (!(this.pictureList.length > 0 || this.mediaList.length > 0 || this.pdfList.length > 0 || this.confirmInfos.length > 0)) {
        this.$message({
          message: '保存或提交用印合同保存信息失败!用印项目合同附件不能为空',
          type: 'error'
        })
        return
      }

      const obj = {
        'attachs': attachs,
        'contract_amount': contract_sum,
        'cust_name': parta,
        'payment_days': payment_days,
        'project_end_time': this.proEndTime,
        'project_name': project_name,
        'project_no': project_code,
        'project_start_time': this.proStartTime,
        'seal_id': this.fileId,
        'second_name': this.secondName,
        'sign_time': contract_date,
        'contract_type': this.ascription,
        'owner_contract_no': contract_code
      }

      let res = await saveSeal(obj)
      if (res.code === 0) {
        this.$message({
          message: '信息提交成功',
          type: 'success'
        })
        attachs = []
        this.$router.push('/contract/')
      }
    },
    changeCookie() {
      if (this.contractInfo.project_code !== undefined) {
        Cookies.set('conInfo', JSON.stringify(this.contractInfo))
      } else {
        this.setContractInfo(JSON.parse(Cookies.get('conInfo')))
      }

      if (this.ascription !== '') {
        Cookies.set('setAsc', this.ascription)
      } else {
        this.setAscription(Cookies.get('setAsc'))
      }
    }
    
  }, 
  mounted() {
    this.initData()
  },
  destroyed() {
    this.reset([])
    this.clearId('')
    this.clearContractType({})
    if (Cookies.get('setAsc') === '1') {
      this.show(true)
    } else {
      this.show(false)
    }
    
    Cookies.remove('conInfo')
    Cookies.remove('setAsc')
    this.proNo('')
  }
}
</script>

<style lang="scss" scoped>
.is-full {
  margin: 20px;
  overflow: auto;
  .marginBtn {
    margin-bottom: 20px;
  }
}
</style>
