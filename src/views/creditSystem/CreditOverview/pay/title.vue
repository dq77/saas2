<template lang="pug">
.title {{title}}
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="stylus" scoped>
.title
  width 100%
  height 45px
  line-height 45px
  padding-left 15px
  box-sizing border-box
  border-bottom 1px solid #EAEBEE
  color #494949
</style>
