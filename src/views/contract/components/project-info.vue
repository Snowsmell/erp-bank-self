<template>
  <text-card>
    <div v-if="title" class="left" slot="header">
      <span class="title">{{title}}</span>
      <el-button v-if="isShown" type="primary" size="mini" class="uploadBtn" @click="handleUpload">上 传</el-button>
    </div>
    <el-row class="teamBorder">
      <el-col :span="24">
        PDF文件
      </el-col>
      <pdf-file></pdf-file>
    </el-row>

    <el-row class="teamBorder">
      <el-col :span="24">
        视频 <span class="tipText">(支持map4格式单个视频不超过500M)</span>
      </el-col>
      <video-file></video-file>
    </el-row>

    <el-row class="teamBorder">
      <el-col :span="24">
        图片文件 <span class="tipText">(支持jpg/png格式，不超过10M)</span>
      </el-col>
      <picture-file></picture-file>
    </el-row>
    <el-row>
      <el-col :span="24">
        确权人信息 <span class="tipText">(支持jpg/png格式，不超过10M)</span>
      </el-col>
      <confirm-file></confirm-file>
    </el-row>
    <upload-info :options="options"></upload-info>
  </text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import UploadInfo from './upload-info'
import { mapState, mapMutations } from 'vuex'
import PdfFile from './pdf-file'
import PictureFile from './picture-file'
import VideoFile from './video-file'
import ConfirmFile from './confirm-file'
import { saveUploadImg } from '@/api/contract'

export default {
  components: {
    TextCard,
    UploadInfo,
    PdfFile,
    PictureFile,
    VideoFile,
    ConfirmFile
  },
  props: {
    title: {
      type: String
    },
    isShown: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      options: state => state.contract.selectList,
      setTip: state => state.contract.setTip
    })
  },
  methods: {
    ...mapMutations({
      dialogVisible: 'SET_CONTRACT_DIALOG_VISIBLE',
      dialogConfirm: 'SET_CONTRACT_CONFIRM'
    }),
    handleUpload(val) {
      this.dialogVisible(true)
      this.dialogConfirm(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadBtn {
  float: right;
}
.teamBorder {
  border-bottom: 1px solid #f5f4f4;
  padding-bottom: 20px;
  margin-bottom: 10px;
}
.tipText {
  color: #ccc
}
</style>
