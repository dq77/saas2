<template lang="pug">
.p-wrap
  router-link.p-read-more-btn.u-absolute(
    :to='{name: "projectTaskList"}'
    v-weblogs.click='"风险工作台-评估任务总览-tab：项目评估-查看全部"'
  ) 查看全部 &gt;
  .p-squares
    SquareInfo(
      :title='config.task.title'
      :desc='config.task.desc'
      :sum='config.task.sum'
      :ongoing='config.task.ongoing'
      :percent='config.task.percent'
    )
    SquareInfo(
      style='margin-top: 25px;'
      :title='config.customer.title'
      :desc='config.customer.desc'
      :sum='config.customer.sum'
      :ongoing='config.customer.ongoing'
      :percent='config.customer.percent'
    )
  .p-charts
    ChartInfo(
      title='快速评估'
      useFor='project'
      :sum='config.charts.quick.sum'
      :ongoing='config.charts.quick.ongoing'
      :percent='config.charts.quick.percent'
    )
    ChartInfo(
      title='深度评估'
      useFor='project'
      :sum='config.charts.deep.sum'
      :ongoing='config.charts.deep.ongoing'
      :percent='config.charts.deep.percent'
    )
</template>

<script>
import SquareInfo from './squareInfo'
import ChartInfo from './chartInfo'
export default {
  components: {
    SquareInfo,
    ChartInfo,
  },
  props: {
    config: Object
  },
  setup() {
    return {
      squareInfos: [],
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-wrap
  display flex
  position relative
.p-charts
  flex 1
  display flex
  justify-content space-around
</style>
