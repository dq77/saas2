<template lang="pug">
.p-top-block(v-if='list && list.length === 2')
  .u-left
    .u-label {{ list[0].label }}
    .u-value {{ list[0].value }}
  .u-gap
  .u-right
    .u-right-wrap
      .u-label {{ list[1].label }}
      .u-value {{ list[1].value }}
</template>

<script>
export default {
  props: {
    list: Array
  },
}
</script>

<style lang="stylus" scoped>
.p-top-block
  display flex
  padding 30px
  width 100%
  background #F8F9FA
  .u-left, .u-right
    flex 1
  .u-right
    border-left 1px solid #CBCFD4
  .u-right-wrap
    padding-left 90px
  .u-label
    color #494949
    font-size 12px
  .u-value
    margin-top 7px
    color #494949
    font-size 22px
    font-weight bold
</style>
