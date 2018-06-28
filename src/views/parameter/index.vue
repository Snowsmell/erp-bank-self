<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <el-header>
        <search v-on:search="handleSearch"></search>
      </el-header>
      
      <el-main class="content">
        <param-table :tableData="list"></param-table>
      </el-main>
      
      <el-footer>
        <el-row type="flex" justify="end">
          <table-page :total="Number.parseInt(total)" :pageSize="Number.parseInt(pageSize)" v-on:returnPage="returnPage"></table-page>
        </el-row>
      </el-footer>
    </app-main>

    <el-footer class="app-footer" height="64px">
      <div class="app-footer-right">
        <el-button type="primary" @click="exportPro">导出Excel</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { AppHeader, AppMain } from '@layout/components'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getRole } from '@/utils/auth'
import { Search, ParamTable, TablePage } from './components'

export default {
  components: {
    AppHeader, AppMain,
    Search, ParamTable,
    TablePage
  },
  data() {
    return {
      pageLoading: false,
      reqJson: {}
    }
  },
  computed: {
    ...mapState({
      list: state => state.parameter.parameterList,
      proName: state => state.parameter.searchProName,
      sellerName: state => state.parameter.searchSellerName,
      debetNo: state => state.parameter.searchDebetNo,
      voucherNo: state => state.parameter.searchVoucherNo,
      timeInterval: state => state.parameter.timeInterval,
      currentPage: state => state.parameter.currentPage
    }),
    ...mapGetters({
      pageSize: 'param_size',
      total: 'param_total'
    })
  },
  methods: {
    ...mapMutations({
      time: 'SET_PARAM_SEARCH_TIME',
      page: 'SET_PARAM_CURRENTPAGE'
    }),
    ...mapActions(['onlinepay', 'exportData']),
    initData() {
      this.getData()
    },
    getData() {
      this.reqJson = {
        'debet_no': this.debetNo,
        'page': this.currentPage,
        'page_size': this.pageSize,
        'project_code': null,
        'project_name': this.proName,
        'repay_time_from': this.timeInterval[0] || null,
        'repay_time_to': this.timeInterval[1] || null,
        'seller_cust_no': null,
        'seller_name': this.sellerName,
        'voucher_no': this.voucherNo
      }
      this.onlinepay(this.reqJson)
    },
    handleSearch() {
      this.page('1')
      this.getData()
    },
    exportPro() {
      this.exportData(this.reqJson)
    },
    returnPage() {
      this.getData()
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
    width: 100%;
    min-height: 600px;
  }
}

</style>
