<template lang="pug">
  .header
    .header-left(:style="`padding-left: ${left}px`")
      span(:class="line ? 'line' : ''") {{title}}
      slot(name="header")
    slot
</template>
<script>
export default {
  props: {
    title: String,
    left: Number,
    line: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style lang="stylus" scoped>
.header
  height 50px
  display flex
  justify-content space-between
  align-items center
  box-sizing border-box
  border-bottom 1px solid rgba(242, 242, 246, 1)
  .header-left
    display flex
    align-items center
    color #494949
    font-size 14px
    font-weight 500
    box-sizing border-box
    .line
      line-height 14px
      padding-left 6px
      border-left 2px solid #3B68F0
</style>
