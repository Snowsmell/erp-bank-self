<template>
  <el-row>
    <el-col :span="5" v-for="(item, index) in pdfList" :key="index" :offset="index > 0 ? 1 : 0">
      <el-card class="elCard">
        <div class="imgWrap">
          <img :src="img_pdf" class="image" @click="dialogConfim(item.review_path)">
        </div>
        <div class="text clearfix">
          <div class="titleWrap">
            <p>{{item.name || item.file_type}}({{index+1}})</p>
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
import PDF from '@/images/pdf_icon.png'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PdfFile',
  data() {
    return {
      img_pdf: PDF,
      href: '#'
    }
  },
  computed: {
    ...mapState({
      pdfList: state => state.contract.pdfList
    })
  },
  methods: {
    ...mapMutations({
      pictureArr: 'SET_CONTRACT_DELETEFILE'
    }),
    handleDelete(item) {
      this.pictureArr(item + '-pdf')
    },
    dialogConfim(href) {
      window.open(href)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
