<template lang='pug'>
  el-popover.vs-popover(
    placement="bottom"
    :title='content.title'
    width='420'
    trigger="hover"
    popper-class='el-vs-popover'
  )
    .vs-popover__tips
      p(v-for='(item, index) in content.list')
        span.vs-popover__tips-label {{ index + 1 }}.{{ item.label }}：
        span.vs-popover__tips-value {{ item.value }}
    i.el-icon-info(slot="reference")
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang='stylus' scoped>
.vs-popover
  &__tips
    // font-size 12px
    &-label
      color #494949
      font-weight bold
    &-value
      font-weight normal
.el-icon-info
  margin-left 5px
</style>
<style lang="stylus">
.el-vs-popover
  max-width 1000px
</style>
