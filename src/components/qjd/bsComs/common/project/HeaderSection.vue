<template lang="pug">
  .header-section
    .header-section_item
      span.title 项目编号：
      span.value {{dataSource.projectSn}}
    .header-section_item
      span.title 项目来源：
      span.value {{projectSoueceMap[dataSource.projectSource]}}
</template>

<script>
import { projectSoueceMap } from './const.js'

export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {
      projectSoueceMap
    }
  },
}
</script>

<style lang="stylus" scoped>
.header-section
  background-color #F4F9FD
  border-radius 4px
  display flex
  padding 20px
  flex-wrap wrap
  margin 20px 0px 30px
  &_item
    width 50%
    line-height 32px
    &:nth-child(2n+1)
      border-right 1px #CDD0D4 dashed
    .title
      width 120px
      text-align right
      display inline-block
      margin-right 10px
      color #738A9E
</style>
