<template>
  <el-aside class="app-aside" width="256px">
    <div class="app-aside-logo">
      <img class="app-aside-avatar" src="@/images/logo.png" alt="">
      <span>华瑞物联银企直联</span>
    </div>
    <nav-bar/>
  </el-aside>
</template>

<script>
import NavBar from './navbar'

export default {
  components: {
    NavBar
  }
}
</script>

