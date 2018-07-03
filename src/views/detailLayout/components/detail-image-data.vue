<template>
  <text-card>
    <div v-if="title" class="left" slot="header">
      <span class="title">{{title}}</span>
    </div>
    <el-row class="teamBorder">
      <el-col :span="24">
        PDF文件
      </el-col>
    </el-row>

    <el-row class="teamBorder">
      <el-col :span="24">
        图片文件
      </el-col>
    </el-row>
  </text-card>
</template>

<script>
import TextCard from '@/components/TextCard'

export default {
  name: 'PictureData',
  components: {
    TextCard
  },
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.teamBorder {
  border-bottom: 1px solid #f5f4f4;
  padding-bottom: 20px;
  margin-bottom: 10px;
}
</style>
