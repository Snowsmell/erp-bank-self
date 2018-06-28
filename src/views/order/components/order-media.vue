<template>
<div>
  <text-card class="media-list">
    <div v-if="title" class="left" slot="header">
      <span class="title">{{ title }}</span>
    </div>
    <template v-if="list.length > 0">
      <media-item
        v-for="(item, index) in list"
        :url="item"
        :key="index"
        :fileType="getFileType(item)"
        @on-preview="handleImagePreview"/>
    </template>
    <div v-else class="no-data"><span>暂无数据</span></div>
  </text-card>
  <el-dialog
    :before-close="dialogClose"
    :visible.sync="dialogVisible"
    top="10vh"
    :append-to-body="true"
    class="media-dialog">
    <img class="btn turnLeft" src="@/images/turnLeft.png" @click="rotatePic('left')"/>
    <img class="btn turnRight" src="@/images/turnRight.png" @click="rotatePic('right')"/>
    <a :href="dialogMediaUrl" target="_blank">
      <img v-if="meidaType === 'image'" class="pic" :src="dialogMediaUrl" alt="">
    </a>
    <video v-if="meidaType === 'video'" :src="dialogMediaUrl" autoplay controls poster="~imgs/media_bg.png">
      抱歉，您的浏览器不支持内嵌视频!
    </video>
  </el-dialog>
</div>
</template>

<script>
import TextCard from '@/components/TextCard'
import MediaItem from './order-media-item'
import { fileSuffix } from '@/utils'

export default {
  components: {
    TextCard,
    MediaItem
  },
  props: {
    title: {
      type: String
    },
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      meidaType: 'image',
      dialogMediaUrl: '',
      dialogVisible: false,
      deg: 0
    }
  },
  methods: {
    dialogClose(done) {
      this.dialogMediaUrl = ''
      done()
    },
    handleImagePreview (url) {
      this.dialogMediaUrl = url
      this.dialogVisible = true
      this.meidaType = this.getFileType(url)
      console.log(this.meidaType)
    },
    getFileType(file) {
      return fileSuffix(file)
    },
    rotatePic(der) {
      let oPic = document.querySelector('.pic')
      if (der === 'left') {
        this.deg -= 90
      } else {
        this.deg += 90
      }
      oPic.style.transform = 'rotate(' + this.deg + 'deg)'
    }
        
  }
}
</script>
<style>
  .btn{
    position:absolute;
    top: 24px;
    width: 30px;
  }
  .turnLeft{
    left: 160px;
  }
  .turnRight{
    right: 160px;
  }
</style>

