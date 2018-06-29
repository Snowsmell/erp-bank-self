<template>
  <el-select v-model="selected" placeholder="请选择" @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item.category_code"
      :label="item.category_name"
      :value="item.category_code">
    </el-option>
  </el-select>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'SelectType',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: '',
      get_tip: ''
    }
  },
  computed: {
    ...mapState({
      contractType: state => state.contract.contractType,
      ascription: state => state.contract.ascription,
      proNo: state => state.contract.proNo
    })
  },
  methods: {
    ...mapMutations({
      isShow: 'SET_CONTRACT_PROJECT_ISSHOW',
      setPlacholder: 'SET_CONTRACT_PLACEHOLDER',
      setAscription: 'SET_CONTRACT_ASCRIPTION',
      setTip: 'SET_CONTRACT_TIP',
      searchContent: 'SET_CONTRACT_SEARCH_CONTENT',
      dialogConfirm: 'SET_CONTRACT_CONFIRM',
      dialogVisible: 'SET_CONTRACT_DIALOG_VISIBLE'
    }),
    ...mapActions(['getContractList']),
    handleChange(item) {
      if (item === '1000012' || item === '2000012') {
        this.$emit('select', '')
      } else {
        this.$emit('select', item)
      }
      this.searchContent(null)
      switch (item) {
        case 'xmht':
          this.isShow(true)
          this.setPlacholder('请输入项目名称')
          this.setAscription('1')
          break
        case 'cght':
          this.isShow(false)
          this.setPlacholder('请输入采购合同编号')
          this.setAscription('2')
          break
        default:
          if (item === '1000012' || item === '2000012') {
            this.dialogVisible(false)
            this.dialogConfirm(true)
            this.selected = ''
          }
          this.isShow(true)
          this.setTip(item)
          break
      }
    }
  },
  mounted() {
    for (var item in this.contractType) {
      if (this.contractType[item] === this.selected) {
        this.get_tip = item
      }
    }
    this.setTip(this.get_tip)
    if (this.proNo !== '') {
      this.selected = ''
    } else {
      if (this.ascription === '') {
        this.selected = this.options[0].category_name
        this.setAscription('1')
      } else {
        this.selected = this.options[this.ascription - 1].category_name
      }
    }
  }

}
</script>
