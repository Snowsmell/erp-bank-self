<template>
  <el-menu
    :default-active="$route.fullPath"
    :collapse="isCollapse"
    :unique-opened="true"
    :router="true"
    class="app-sidemenu"
    background-color="#001529"
    text-color="rgba(255, 255, 255, .65)"
    @select="handleSelect"
    active-text-color="#fff">    
    <template v-for="(menu, index) in menuList">
      <el-submenu v-if="menu.children" :index="menu.link" :key="index">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.title}}</span>
        </template>
        <el-menu-item v-for="submenu in menu.children" :index="submenu.link" :key="submenu.link">{{submenu.title}}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.link" :key="menu.link">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { generateMenu } from '@/router/menu'

export default {
  data() {
    return {
      isCollapse: false,
      menuList: generateMenu(this.$store.getters.roleId)
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$route.meta.comefrom = key
    }
  }
}
</script>
