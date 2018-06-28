<template>
  <div class="media-item">
    <a href="javascript:;" :class="['item', fileType]"><img v-if="fileType === 'image'" :src="url" alt=""></a>
    <div class="mask"><i class="el-icon-zoom-in view" @click="handlePreview(url)" title="点击预览"></i></div>
  </div>
</template>

<script>

export default {
  name: 'MediaItem',
  props: {
    url: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      default: 'image'
    },
    multipl: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePreview(url) {
      if (!this.multipl) {
        this.$emit('on-preview', url)
      } else {
        this.$emit('showMultipl')
      }      
    }
  }
}
</script>

