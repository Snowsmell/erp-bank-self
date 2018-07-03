<template>
  <el-container class="app-container order-conrainer">
    <!-- 侧边栏 -->
    <el-aside class="order-main-aside">
      <icon-sidebar></icon-sidebar>
    </el-aside>
    <!-- 主内容 -->
    <el-container direction="vertical">
      <detail-header></detail-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import { IconSidebar, DetailHeader } from './components'
import { AppMain } from '@layout/components'

export default {
  name: 'DetailLayout',
  components: {
    IconSidebar,
    DetailHeader,
    AppMain
  }
}
</script>
