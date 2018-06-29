<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <contract-filter
        :type="contractType"
        @onchange="handleTypeChange"
        @onsearch="handleSearch"
        style="margin-bottom: 20px" />
      
      <contract-table
        :list="contractList"
        :type="contractType" />
      
      <el-pagination
        :current-page="Number.parseInt(currPage)"
        :page-size="Number.parseInt(pageSize)"
        :total="Number.parseInt(total)"
        layout="total, prev, pager, next, jumper"
        @current-change="handlePageChange"
        style="text-align:right; margin-top: 20px">
      </el-pagination>
    </app-main>

    <el-footer class="app-footer" height="64px"></el-footer>
  </el-container>
</template>

<script>
import { AppHeader, AppMain } from '@layout/components'
import { ContractFilter, ContractTable } from './components'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { saveContractImg } from '@/api/contract'

import { getRole } from '@/utils/auth'

export default {
  name: 'ContractList',
  components: {
    AppHeader, AppMain,
    ContractFilter,
    ContractTable
  },
  data() {
    return {
      pageLoading: false,
      contractCount: 0,
      contractType: 1,
      condition: {
        page: 1,
        page_size: 10,
        project_name: '',
        project_no: ''
      }
    }
  },
  computed: {
    ...mapState({
      contractList: state => state.contract.contractList,
      currPage: state => state.contract.currentPage,
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
  methods: {
    ...mapMutations({
      payment: 'SET_PAYMENT',
      currentPage: 'SET_CONTRACT_CURRENTPAGE',
      searchContent: 'SET_CONTRACT_SEARCH_CONTENT'
    }),
    ...mapActions(['getContractList', 'getProcurementList', 'getProcurementList']),

    initData(val) {
      this.pageLoading = true
      if (this.contractType === 1) {
        this.getContractList()
      } else if (this.contractType === 2) {
        this.getProcurementList()
      } 
      this.pageLoading = false
    },

    handleSearch(val) {
      this.currentPage('1')
      this.searchContent(val)
      this.initData()
    },

    handlePageChange(val) {
      this.currentPage(val)
      this.initData()
    },

    handleTypeChange(val) {
      this.contractType = val
      this.initData()
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
  padding: 20px;
  overflow: auto;
  .content {
    min-height: 600px;
  }
}
</style>
