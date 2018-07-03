<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="view-main">
      <review-filter 
        @changeFilter="handleFilter"/>

      <data-table 
        :tableData="list" />

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="text-align:right; margin-top: 20px">
      </el-pagination>
    </app-main>

    <app-footer :numbers="quantity" :amount="amount">
      <el-button type="primary" @click="handlePass">通过</el-button>
    </app-footer>
  </el-container>
</template>

<script>
import { AppHeader, AppFooter, AppMain } from '@layout/components'
import { DataTable } from '@dataList/components'
import { ReviewFilter } from './components'
import { getRequestList, postPaymentApprove } from '@/api/order'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    AppHeader, AppFooter, AppMain,
    DataTable, ReviewFilter
  },
  data() {
    return {
      pageLoading: false,
      list: [],
      pageSize: 10,
      total: 12,
      currPage: 1,
      page: 1,
      param: {}
    }
  },
  computed: {
    ...mapGetters({
      amount: 'commonAmount',
      quantity: 'selectAmount',
      requestId: 'selectedRequestId'
    })
  },
  methods: {
    ...mapMutations({
      setList: 'SET_SELECT_LIST'
    }),
    initData() {
      let obj = Object.assign({status: 1}, this.param, {page: this.page})
      getRequestList(obj).then(res => {
        if (res.code === 0) {
          this.list = res.data.results
          this.total = res.data.count
        }
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.currPage = val
      this.initData()
    },
    handleFilter(val) {
      if (val !== undefined) {
        this.param = val
      }
      this.page = 1
      this.currPage = 1
      this.initData()
    },
    handlePass() {
      console.log('通过所选择的选项')
      let json = {
        ids: this.requestId
      }
      postPaymentApprove(json).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.initData()
    this.setList([])
  }
}
</script>
