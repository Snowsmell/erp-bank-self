<template>
  <div class="avatar-item">
    <div class="avatar">
      <img v-if="url" :src="url" :alt="name">
    </div>
    <div v-if="name" class="name" v-text="name"></div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    name: String
  }
}
</script>

<style lang="scss">
.avatar-item{
  margin: 8px;

  .avatar{
    overflow: hidden;
    width: 64px; height: 64px;
    border-radius: 50%;
    
    img{
      display: block;
      width: 64px; height: 64px;
      border-radius: 50%;
    }
  }
  .name{
    margin-top: 8px;
    text-align: center;
  }
}
</style>

