<template>
  <el-container class="app-container">
    <!-- 侧边栏 -->
    <app-sidebar></app-sidebar>
    <!-- 主内容 -->
    <router-view></router-view>
  </el-container>
</template>

<script>
import { AppSidebar } from './components'

export default {
  name: 'Layout',
  components: {
    AppSidebar
  }
}
</script>
