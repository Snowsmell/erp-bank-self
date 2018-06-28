<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <search v-on:search="handleSearch"></search>

      <table-list
        :datalist="$store.getters.transactionList"
        v-on:handleEdit="handleEditor"
        v-on:handleDelete="handleDelete">
      </table-list>
      
      <el-pagination
        :current-page="1"
        :page-size="10"
        :total="$store.getters.transactionTotal"
        layout="total, prev, pager, next, jumper"
        @current-change="handlePageChange"
        style="text-align:right; margin-top: 20px">
      </el-pagination>
    </app-main>

    <el-footer class="app-footer" height="64px">
      <div class="app-footer-right">
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </div>
    </el-footer>
    
    <dialog-info 
      :title="dialogTitle" 
      :dialogVisible="dialogVisible" 
      :dialogInfo="dialogInfo" 
      v-on:dialogClose="handleBeforeClose"
      @dialogUpdate="handleTransaction">
    </dialog-info>

  </el-container>
</template>

<script>
import { AppHeader, AppMain } from '@layout/components'
import { TableList, Search, DialogInfo, DialogInfoShow } from './components'
import { mapState, mapActions } from 'vuex'
import { postTransaction, deleteTransaction } from '@/api/parameter'

export default {
  name: 'LedgerList',
  components: {
    AppHeader, AppMain,
    TableList, Search,
    DialogInfo, DialogInfoShow
  },
  data() {
    return {
      pageLoading: false,
      list: [{
        date: 'sd'
      }],
      dialogTitle: '环保台账信息',
      dialogVisible: false,
      dialogInfo: {}
    }
  },
  methods: {
    ...mapActions(['getTransactions']),
    initData() {
      this.getTransactions({ page: 1 })
    },
    handlePageChange(val) {
      this.getTransactions({ page: val })
    },
    handleSearch(val) {
      const condition = Object.assign({page: 1}, val)
      this.getTransactions(condition)
    },
    handleCreate() {
      this.dialogInfo = {}
      this.dialogVisible = true
    },
    handleEditor(val) {
      this.dialogInfo = { ...val }
      this.dialogVisible = true
    },
    handleDelete(id) {
      deleteTransaction(id).then(res => {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        this.$router.push('/refresh')
      })
    },
    handleBeforeClose() {
      this.dialogVisible = false
      this.dialogInfoVisible = false
      this.dialogInfo = {}
    },
    handleTransaction() {
      postTransaction(this.dialogInfo).then(res => {
        this.$router.push('/refresh')
      })
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
    width: 100%;
    min-height: 600px;
  }
}

</style>
