<template>
  <div>银企直联</div>
</template>

<script>
import { getHomeLink } from '@/router/menu'

export default {
  name: 'Home',
  created() {
    this.$router.push(getHomeLink(this.$store.getters.roleId))
  }
}
</script>

