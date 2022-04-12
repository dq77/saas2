<template lang='pug'>
.promptInfo
  i.el-icon-warning-outline
  span {{ title }}
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='stylus' scoped>
.promptInfo
  margin-bottom 20px
  padding 20px
  font-size 14px
  color #3B68F0
  display flex
  background rgba(77, 127, 213, 0.1)
  i
    width 15px
    margin-top 4px
  span
    margin-left 10px
</style>
