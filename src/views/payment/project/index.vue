<template>
  <el-container
    direction="vertical"
    v-loading="pageLoading"
    element-loading-background="rgba(255, 255, 255, 0.92)"
    element-loading-text="正在加载数据...">
    <app-header></app-header>

    <app-main class="is-full">
      <project-left :list="projectList"></project-left>

      <app-main-right v-loading="$store.getters.loading">
        <order-header
          type="project"
          :info="projectData">
        </order-header>

        <project-tab></project-tab>
        <project-list
          v-if="projectSupplier.count > 0"
          :list="projectSupplier.results">
        </project-list>
        <div v-else class="no-data"><span>暂无数据</span></div>
      </app-main-right>
    </app-main>

    <app-footer
      v-if="projectStatus === 0 || projectStatus === 3"
      text="已选总金额"
      :amount="projectSelectedInfo.amount">
      <div class="check" slot="check">
        <span class="info">已选择 {{projectSelectedInfo.count}} 项采购合同</span>
      </div>
      <el-button
        v-if="projectStatus === 0"
        type="primary"
        class="w150"
        @click="onApply">
        申请付款
      </el-button>
      <el-button
        v-if="projectStatus === 3"
        type="primary"
        class="w150"
        @click="onReApply">
        申请重审
      </el-button>
    </app-footer>

  </el-container>
</template>
<style scoped>
  .el-button{
    font-size:18px;
  }
</style>
<script>
import { AppHeader, AppFooter, AppMain, AppMainRight } from '@layout/components'
import { OrderHeader } from '@order/components'
import { ProjectLeft, ProjectTab, ProjectList } from './components'

import { postPayment, postPaymentRetrail } from '@/api/order'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    AppHeader, AppFooter, AppMain, AppMainRight,
    OrderHeader,
    ProjectLeft, ProjectTab, ProjectList
  },
  data() {
    return {
      pageLoading: true
    }
  },
  computed: {
    ...mapState({
      projectStatus: state => state.project.currentProjectStatus,
      currentProject: state => state.project.currentProject,
      projectSupplier: state => state.project.currentProjectSupplier,
      projectSelected: state => state.project.projectSelected,
      searchStatus: state => state.project.searchStatus,
      projectList: state => state.project.projectList
    }),
    // 项目 头部信息
    projectData() {
      const { project_name, project_code, amount } = this.currentProject
      return {
        title: project_name,
        desc: {
          text: '项目合同编号',
          value: project_code
        },
        amount: {
          text: '项目总金额',
          value: amount
        },
        count: {
          text: '供应商总数',
          value: this.projectSupplier.count || 0
        }
      }
    },
    // 已选择申请付款项目信息
    projectSelectedInfo() {
      let amount = 0
      let count = 0
      let selectedArr = this.projectSelected
      if (selectedArr.length > 0) {
        selectedArr.map(supplierItem => {
          if (supplierItem && supplierItem.length > 0) {
            count += supplierItem.length
            supplierItem.map(orderItem => {
              amount += Number(orderItem['amount'])
            })
          }
        })
      }
      return {
        amount,
        count
      }
    }
  },
  methods: {
    ...mapMutations({ search: 'SET_PROJECT_SEARCH' }),
    ...mapActions(['getProjectList', 'getProjectSupplier']),
    getAllData() {
      this.search('project')
      
      return this.getProjectList(0).then(res => {
        return this.getProjectSupplier()
      })
    },
    // 获取提交申请信息
    getApplyData() {
      let postData = []
      let supplierList = this.projectSupplier.results

      let selectedArr = this.projectSelected
      if (selectedArr.length > 0) {
        selectedArr.map((supplierItem, key) => {
          const { vendor_code, vendor_name } = supplierList[key]
          if (supplierItem && supplierItem.length > 0) {
            let orderList = []
            supplierItem.map(orderItem => {
              orderList.push({
                'order_id': orderItem['order_id']
              })
            })
            postData.push({
              vendor_name,
              vendor_code,
              'order_list': orderList
            })
          }
        })
      }

      return postData
    },
    // 获取提交重审信息
    getReApplyData() {
      let payList = []

      let selectedArr = this.projectSelected
      if (selectedArr.length > 0) {
        selectedArr.map(supplierItem => {
          if (supplierItem && supplierItem.length > 0) {
            supplierItem.map(orderItem => {
              payList.push(orderItem['request_id'])
            })
          }
        })
      }

      return {
        'pay_request_id': payList
      }
    },
    /**
     * 处理 [申请|重审]
     * type: [0 申请 | 非0 审核]
     */
    handlePayment(type) {
      let promise
      if (type === 0) {
        promise = postPayment(this.getApplyData())
      } else {
        promise = postPaymentRetrail(this.getReApplyData())
      }
      promise.then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '申请成功!'
          })
          this.$router.push('/refresh')
        }
      })
      return promise
    },
    // 提交申请
    onApply() {
      if (this.projectSelectedInfo.count === 0) {
        this.$alert('请选择采购合同', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      
      this.$confirm('确定提交已选择的付款申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment(0)
      }).catch(() => {
        // console.log('取消操作')
      })
    },
    // 提交重审
    onReApply() {
      if (this.projectSelectedInfo.count === 0) {
        this.$alert('请选择采购合同', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }

      this.$confirm('确定提交已选择的申请重审?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handlePayment(1)
      }).catch(() => {
        // console.log('取消操作')
      })
    }
  },
  mounted() {
    this.getAllData().then(res => {
      this.pageLoading = false
    }).catch(err => {
      this.pageLoading = false
    })
  }
}
</script>

