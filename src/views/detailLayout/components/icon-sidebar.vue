<template>
<div class="aside">
  <div class="app-aside-logo">
    <img class="app-aside-avatar" src="@/images/logo.png" alt="">
  </div>
  <el-menu default-active="0">
    <el-menu-item 
      v-for="(item, index) in icon" 
      :key="index" 
      :index="index.toString()">
      <i :class="item"></i>
    </el-menu-item>
  </el-menu>
</div>

</template>

<script>
export default {
  name: 'IconSidebar',
  data() {
    return {
      icon: ['el-icon-menu', 'el-icon-document', 'el-icon-edit-outline', 'el-icon-sold-out', 'el-icon-upload']
    }
  }
}
</script>
