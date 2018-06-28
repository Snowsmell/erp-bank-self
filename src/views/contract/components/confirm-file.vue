<template>
  <el-row>
    <el-col :span="5" v-for="(item, index) in confirmInfos" :key="index" :offset="index > 0 ? 1 : 0">
      <el-card class="elCard">
        <div class="imgWrap">
          <img :src="item.confirm_hand_id_no_image" class="image" @click="dialogConfim(index)">
        </div>
        
        <div class="text clearfix">
          <div class="titleWrap">
            <p>{{item.confirm_name}}</p>
          </div>
          <div class="btnWrap">
            <p class="button" @click="handleDelete(index)">删除</p>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ConfirmFile',
  computed: {
    ...mapState({
      confirmInfos: state => state.contract.confirmInfos
    })
  },
  methods: {
    ...mapMutations({
      pictureArr: 'SET_CONTRACT_DELETEFILE',
      dialogConfirm: 'SET_CONTRACT_CONFIRM',
      confirmIndex: 'SET_CONTRACT_CONFIRM_INFO_INDEX',
      showInfo: 'SET_CONTRACT_CONFIRM_INFO_SHOW',
      deleteInfo: 'SET_CONTRACT_DELETEFILE'
    }),
    handleDelete(item) {
      this.deleteInfo(item + '-confirm')
    },
    dialogConfim(index) {
      this.confirmIndex(index)
      this.dialogConfirm(true)
      this.showInfo(true)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
