<template lang="pug">
.p-top-block
  .u-label {{ label }}
  .u-value {{ value }}
  img.u-img(:src='iconUrl')
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    iconUrl: String
  },
}
</script>

<style lang="stylus" scoped>
.p-top-block
  position relative
  padding 30px
  width 100%
  background-color #F8F9FA
  .u-label
    color #494949
    font-size 12px
  .u-value
    margin-top 7px
    color #494949
    font-size 22px
    font-weight bold
  .u-img
    position absolute
    top 26px
    right 60px
    width 80px
    height 60px
</style>
