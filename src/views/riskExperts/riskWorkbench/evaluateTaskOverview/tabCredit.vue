<template lang="pug">
.p-wrap
  router-link.p-read-more-btn.u-absolute(
    :to='{name: "creditTaskList"}'
    v-weblogs.click='"风险工作台-评估任务总览-tab：赊销评估-查看全部"'
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
      primaryColor='#3BB5EF'
      :sum='config.charts.quick.sum'
      :ongoing='config.charts.quick.ongoing'
      :percent='config.charts.quick.percent'
      :success='config.charts.quick.success'
      :successPercent='config.charts.quick.successPercent'
      :reject='config.charts.quick.reject'
      :rejectPercent='config.charts.quick.rejectPercent'
    )
    ChartInfo(
      title='标准评估'
      primaryColor='#10B4C4'
      :sum='config.charts.standard.sum'
      :ongoing='config.charts.standard.ongoing'
      :percent='config.charts.standard.percent'
      :success='config.charts.standard.success'
      :successPercent='config.charts.standard.successPercent'
      :reject='config.charts.standard.reject'
      :rejectPercent='config.charts.standard.rejectPercent'
    )
    ChartInfo(
      title='精准评估'
      primaryColor='#3B68F0'
      :sum='config.charts.accurate.sum'
      :ongoing='config.charts.accurate.ongoing'
      :percent='config.charts.accurate.percent'
      :success='config.charts.accurate.success'
      :successPercent='config.charts.accurate.successPercent'
      :reject='config.charts.accurate.reject'
      :rejectPercent='config.charts.accurate.rejectPercent'
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
