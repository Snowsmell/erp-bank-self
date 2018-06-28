<template>
  <app-main-left>
    <aside-search/>
    <aside-list
      :list="contractList"
      :current="$store.getters.contractCode"
      :itemClik="handleItemClik"
      class="app-side-list"/>
    <!-- <aside-list-page/> -->
  </app-main-left>
</template>

<script>
import { AppMainLeft } from '@layout/components'
import { AsideSearch, AsideList, AsideListPage } from '@order/components'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { backShowImg } from '@/api/contract'

export default {
  components: {
    AppMainLeft,
    AsideSearch, AsideList, AsideListPage
  },
  computed: {
    ...mapState({
      list: state => state.contract.contractList
    }),
    ...mapGetters({
      contractCode: 'contractCode'
    }),
    contractList() {
      let arr = []
      let list = this.list
      if (list.length > 0) {
        list.map(item => {
          const { project_name, project_code, salecontractsum } = item
          arr.push({
            itemId: project_code,
            title: project_name,
            desc: {
              text: '项目编号',
              value: project_code
            },
            amount: {
              text: '合同金额',
              value: salecontractsum
            }
          })
        })
      }
      return arr
    }
  },
  methods: {
    ...mapMutations({
      setLoading: 'SET_LOADING',
      setContract: 'SET_CONTRACT',
      proBackShowImg: 'SET_CONTRACT_BACKSHOWIMG',
      proAttachsId: 'SET_CONTRACT_IMGID',
      proSealId: 'SET_CONTRACT_SEALID',
      setImgUrl: 'SET_CONTRACT_REVIEWPATH'
    }),
    ...mapActions(['getRepayLoan', 'getRepayBank']),
    async handleItemClik(index) {
      this.setContract(this.list[index])
      let res = await backShowImg(this.contractCode)
      if (res.code === 0) {
        if (res.data.attachs && res.data.attachs.length > 0) {
          this.proAttachsId(res.data.attachs[0].id)
          this.proSealId(res.data.id)
          this.proBackShowImg([{name: 'upfile', url: res.data.attachs[0].contract_file}])
          this.setImgUrl(res.data.attachs[0].contract_file)
        } else {
          this.proBackShowImg([])
          this.setImgUrl('')
        }
      }
    }
  }
}
</script>
