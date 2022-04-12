<template lang="pug">
.p-detail-title {{title}}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-detail-title
  position relative
  min-height 50px
  font-size 18px
  line-height 50px
  text-indent 20px
  color #494949
  margin-bottom 10px
  &:before
    content ''
    position absolute
    top 18px
    left 0
    width 3px
    height 14px
    background-color #25BECD
    border-radius 2px
</style>
