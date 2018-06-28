<template>
  <div></div>
</template>

<script>
export default {
  name: 'Refresh',
  beforeRouteEnter(to, from, next) {
    // let url = from.fullPath || '/'
    let url = from.path || '/'
    next(vm => {
      vm.$router.push(url)
    })
  }
}
</script>

