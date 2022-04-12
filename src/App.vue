<template lang="pug">
#app
  router-view
</template>

<script>
import Layout from '@/layouts/layout/Layout.vue'
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>
<style lang="stylus" scoped>
#app
  position relative
  width 100%
  height 100%
  overflow hidden
</style>
