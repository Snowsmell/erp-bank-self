<template>
<app-main-left>
  <aside-search/>
  <aside-list
    :list="projectList"
    :current="$store.getters.currentProjectCode"
    :itemClik="handleItemClik"
    class="app-side-list"/>
  <!-- <aside-list-page/> -->
</app-main-left>
</template>

<script>
import { AppMainLeft } from '@layout/components'
import { AsideSearch, AsideList, AsideListPage } from '@order/components'
import { SET_LOADING, SET_CURRENT_PROJECT } from '@/store/mutation-types'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: {
    AppMainLeft,
    AsideSearch, AsideList, AsideListPage
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    projectList() {
      let arr = []
      let list = this.list
      if (list.length > 0) {
        list.map(item => {
          const { project_name, project_code, amount, project_contract_no } = item
          arr.push({
            itemId: project_code,
            title: project_name,
            desc: {
              text: '项目合同编号',
              value: project_contract_no
            },
            amount: {
              text: '待申请总金额',
              value: amount
            },
            status: {
              message: '待申请',
              code: 0
            }
          })
        })
      }
      return arr
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING,
      setProject: SET_CURRENT_PROJECT
    }),
    ...mapActions(['getProjectSupplier']),
    handleItemClik(index) {
      this.setProject(this.list[index])
      this.setLoading(true)
      this.getProjectSupplier()
        .then(res => this.setLoading(false))
        .catch(err => this.setLoading(false))
    }
  }
}
</script>
