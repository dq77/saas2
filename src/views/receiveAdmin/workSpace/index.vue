<template lang='pug'>
.page-main.work-space
  .work-space__others
    .work-space__others--left
      //- 场景操作
      Quick
      //- 应收预警
      Warn
    .work-space__others--right
      //- 应收日历
      Calendar
      //- 应收任务
      Task
  //- 总览切换
  AllOverview
  //- 应收排名
  Rank
  //- 应收健康状况
  Health
  //- 催收情况总览
  CollectionOverview
</template>

<script>
import Quick from './quick/index'
import Warn from './warn/index'
import Calendar from './calendar/index'
import Task from './task/index'
import Rank from './rank/index'
import AllOverview from './allOverview/index'
import Health from './health/index'
import CollectionOverview from './collectionOverview/index'

export default {
  components: {
    Quick,
    Warn,
    Calendar,
    Task,
    Rank,
    AllOverview,
    Health,
    CollectionOverview
  },
  setup (props) {
    return {}
  }
}
</script>

<style lang='stylus' scoped>
.work-space__others
  width 100%
  display flex
  justify-content space-between
  &--left
    width 0
    margin-right var(--smallSpace)
    flex-grow 1
    display flex
    flex-direction column
  &--right
    width 324px
.work-space__others--left > div, .work-space__others--right > div
  border-radius var(--defaultStadius)
  overflow hidden
</style>
