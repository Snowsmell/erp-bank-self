<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <el-header>
        <el-row>
          <el-col :span="5">
            <select-type :options="options" ></select-type>
          </el-col>
          <el-col :span="6">
            <search-input></search-input>
          </el-col>
          <el-col :span="5" :push="1">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-col>
        </el-row>
      </el-header>
      
      <el-main class="content">
        <contract-table :tableData="tableData"></contract-table>
      </el-main>
      
      <el-footer>
        <el-row type="flex" justify="end">
          <table-page :total="Number.parseInt(total)" :pageSize="Number.parseInt(pageSize)"></table-page>
        </el-row>
      </el-footer>
    </app-main>

    <el-footer class="app-footer" height="64px"></el-footer>
  </el-container>
</template>

<script>
import { AppHeader, AppMain } from '@layout/components'
import { SelectType, SearchInput, ContractTable, TablePage } from './components'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { saveContractImg } from '@/api/contract'

import { getRole } from '@/utils/auth'

export default {
  components: {
    AppHeader, AppMain,
    SelectType, SearchInput,
    ContractTable,
    TablePage
  },
  computed: {
    ...mapState({
      tableData: state => state.contract.contractList,
      searchInput: state => state.contract.searchContent,
      isShow: state => state.contract.projectIsShow
    }),
    ...mapGetters({
      pageSize: 'pageSize',
      total: 'total'
    })
  },
  watch: {
    isShow: function() {
      this.getContractList()
    }
  },
  data() {
    return {
      pageLoading: false,
      contractData: {},
      flag: false,
      options: [{
        category_code: 'xmht',
        category_name: '项目合同编号'
      }, {
        category_code: 'cght',
        category_name: '采购合同编号'
      }]
    }
  },
  methods: {
    ...mapMutations({
      payment: 'SET_PAYMENT',
      currentPage: 'SET_CONTRACT_CURRENTPAGE'
    }),
    ...mapActions(['getContractList', 'getProcurementList']),
    initData() {
      this.pageLoading = true
      this.getContractList()
      this.pageLoading = false
    },
    handleSearch() {
      this.currentPage('1')
      this.getContractList(this.searchInput)
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
.is-full {
  background-color: #fff;
  margin: 20px;
  padding: 20px 0;
  overflow: auto;
  .content {
    min-height: 600px;
  }
}
</style>
