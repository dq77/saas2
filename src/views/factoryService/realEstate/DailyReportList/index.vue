<template lang="pug">
  .page-main
    .p-flex
      .p-list-main
        List
      .p-nav-main
        Nav
</template>

<script>
import List from './list'
import Nav from './nav'
export default {
  components: {
    List, Nav
  }

}
</script>

<style lang="stylus" scoped>
.p-list-main
  width 75%
.p-nav-main
  width 25%
  margin-left 10px
  min-width 225px
</style>
