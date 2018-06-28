<template>
<div>
  <div class="media-item">
    <a href="javascript:;" :class="['item', fileType]"><img v-if="fileType === 'image'" :src="url" alt=""></a>
    <div class="mask"><i class="el-icon-zoom-in view" @click="handlePreview(url)" title="点击预览"></i></div>
  </div>
  <p style="text-align: center">{{ fileName }}</p>
</div>
</template>

<script>

export default {
  name: 'PictureItem',
  props: {
    url: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      default: 'image'
    },
    fileName: {
      type: String,
      required: true
    }
  },
  methods: {
    handlePreview(url) {
      this.$emit('on-preview', url)
    }
  }
}
</script>

