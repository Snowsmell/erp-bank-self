<template>
<el-container
  direction="vertical"
  v-loading="pageLoading"
  element-loading-background="rgba(255, 255, 255, 0.92)"
  element-loading-text="正在加载数据...">
  <app-header></app-header>
  <app-main class="data-list">
    <el-header style="border-bottom:1px solid #ddd">
      <search-wrap>
        <el-row class="data-list-row">
          <search-project/>
          <search-purchase/> 
          <search-event/>
        </el-row>
      </search-wrap>
    </el-header>
    
    <el-main class="table-main" style="padding:0">
      <data-table-transport 
        :tableData="list"
        :nowpage="currentPage"
        v-if="roleId === 1 && this.$route.name !== 'approvalDataList'"/>
      <data-table :tableData="list" v-if="roleId === 2 || this.$route.name === 'approvalDataList' " />
    </el-main>
    
    <el-footer class="data-list-footer" style="padding-top:15px">
      <table-page :total="Number.parseInt(total)" :nowPage.sync="currentPage" v-if="!reset"></table-page>
    </el-footer>
  </app-main>
  
  <app-footer :amount="amount" v-if="routeName !== 'approvalDataList'">
    <div class="check" style="float:left;margin-left:0;line-height:40px">已经选择 <span style="color:#2EBFDE">{{selectList.length}}</span> 项
    </div>
    <el-button 
    v-if="roleId === 1 && routeName === 'paymentDataList'"
    type="primary" 
    @click="payRequest" 
    :disabled="isDisabled"
    >申请付款</el-button>
    <el-button 
    v-if="roleId === 2 && routeName === 'paymentDataList'"
    type="primary" 
    @click="payRequest" 
    :disabled="isDisabled"
    >通过</el-button>    
    <el-button 
    v-if="roleId === 2 && routeName === 'transforDataList'"
    type="primary" 
    @click="payRequest" 
    :disabled="isDisabled"
    >应收转让申请</el-button>     
  </app-footer>
</el-container>
</template>

<script>
import { AppHeader, AppMain, AppFooter } from '@layout/components'
import { 
  SearchWrap, 
  SearchProject, 
  SearchPurchase, 
  SearchEvent,
  DataTable,
  DataTableTransport,
  TablePage
} from './components'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'DataList',
  components: {
    AppHeader, AppMain, AppFooter,
    SearchWrap, 
    SearchProject, 
    SearchPurchase, 
    SearchEvent,
    DataTable,
    DataTableTransport,
    TablePage
  },
  computed: {
    ...mapState({
      list: state => state.common.dataList,
      selectList: state => state.common.selectedList,
      total: state => state.common.total,
      roleId: state => state.user.roleId
    }),
    ...mapGetters({
      amount: 'commonAmount'
    }),
    routeName() {
      return this.$route.name
    },
    isDisabled() {
      return this.selectList.length === 0 
    }
  },
  watch: {
    $route(val, oldval) {
      this.setselectlist([])
      this.switchFunction()       
      // this.reset = true
      // this.$nextTick(() => {
      //   this.reset = false
      // })
    },
    currentPage(val) {
      this.setselectlist([])
      this.switchFunction(val) 
    }
  },
  data() {
    return {
      pageLoading: false,
      currentPage: 1,
      reset: false
    }
  },
  methods: {
    ...mapActions([      
      'getRequestList',
      'getPayLaunchList',
      'getRequestedList', 
      'setselectlist',
      'launchPayRequest']),

    switchFunction(data) {    
      data = Object.assign({}, { page: this.currentPage })
      let name = this.$route.name    
      if (this.roleId === 1) {
        if (name === 'paymentDataList') {
          this.getPayLaunchList(data)
        } else if (name === 'approvalDataList') {
          this.getRequestedList(data)
        }
      } else if (this.roleId === 2) {
        if (name === 'paymentDataList' || name === 'transforDataList') {
          this.getRequestList(data)
        }
      }
    },
    payRequest() {
      this.launchPayRequest().then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } 
      }).catch(err => {
        if (err.response.data.code === 500) {
          this.$message({
            message: err.response.data.message,
            type: 'error'
          })
        }
      })
    }
  },
  mounted() {
    this.switchFunction()
  }
}
</script>
