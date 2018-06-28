<template>
  <div v-if="isShow">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="项目合同" name="first">
        <pro-detail :info="infoXmht"></pro-detail>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ProDetail from './project-detail'

export default {
  components: { 
    ProDetail
  },
  data() {
    return {
      isShow: true,
      activeName: 'first'
    }
  },
  computed: {
    ...mapState({
      infoXmht: state => state.contract.currentContract
    })
  },
  watch: {
    $route(val) {
      // 路由改变, 调用数据接口
      const query = val.query
      const { project_contract_code, project_code } = query
      const name = this.$route.name
      // 防止点击当前无参数的路由
      if ((!project_contract_code && !project_code) && name === this.routeName) {
        return false
      }
      this.initData(val.query)
    }
  },
  methods: {
    ...mapMutations({
      setLoading: 'SET_LOADING',
      setQuery: 'SET_ORDER_URL_QUERY',
      setContract: 'SET_CONTRACT'
    }),

    initData(query) {
      this.setLoading(true)
      this.setQuery(query)
      const { project_name, project_code, first_man, project_contract_code, salecontractdate, salesalecontractsum } = query
      if (project_code && project_contract_code) {
        this.isShow = true
        if (project_code) {
          this.isPayment = true
        }
      }
      this.setLoading(false)
    }
  },
  created() {
    // 组件加载, 执行 调用数据接口
    this.initData(this.$route.query)
  },
  beforeDestroy() {
    // 销毁之前 重置 store 中 state[currentPayment, orderUrlQuery]
    this.setLoading(false)
    this.setContract({})
    this.setQuery({})
  }
}
</script>

