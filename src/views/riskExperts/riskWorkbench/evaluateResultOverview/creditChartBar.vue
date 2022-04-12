<template lang="pug">
.p-chart-info
  .u-title 评估模式及评级结果
  router-link.p-read-more-btn.u-absolute(
    :to='{name: "creditTaskList"}'
    v-weblogs.click='"风险工作台-评估结果总览-tab：赊销评估-评估模式及评级结果-查看全部"'
  ) 查看全部 &gt;
  .u-level-tabs
    .u-label 风险评级
    .u-tab(
      v-for='level in creditLevels'
      :key='level'
      :class='activeTab === level ? "u-active" : ""'
      @click='clickLevel(level)'
      v-weblogs.click='"风险工作台-评估结果总览-tab：赊销评估-风险等级选择"'
    ) {{ level }}
  .u-chart(ref='chartRef')
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import { getBarOption1 } from './../chartOptions'
import { creditLevels } from './../config'

export default {
  props: {
    activeTab: String,
    taskList: Array,
    customerList: Array
  },
  setup(props, { emit }) {
    const chartRef = ref()
    let chartState = null

    function renderChart() {
      const option = getBarOption1({
        data: [props.taskList, props.customerList],
        legnedData: ['赊销评估任务数', '赊销评估客户数'],
        xAxisData: ['快速评估', '标准评估', '精准评估'],
        color: ['#3B68F0', '#25BECD']
      })
      chartState.setOption(option)
      chartState.chartInit()
    }

    onMounted(() => {
      chartState = useCharts({
        id: chartRef.value,
        isResize: false,
        isInit: false
      })
      renderChart()
    })

    watch(
      [
        () => props.taskList,
        () => props.customerList,
      ],
      () => renderChart()
    )

    const clickLevel = (level) => emit('clickLevel', level)

    return {
      chartRef,
      creditLevels,
      clickLevel,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-chart-info
  position relative
  height 100%
  .u-title
    color #6D7278
    font-size 12px
  .u-level-tabs
    display flex
    justify-content space-between
    align-items center
    margin-top 25px
    .u-label
      padding-right 13px
      height 12px
      border-right 1px solid #ECECEF
      color #738A9E
      font-size 12px
      line-height 12px
    .u-tab
      width 34px
      height 22px
      line-height 22px
      text-align center
      color #6D7278
      font-size 18px
      border-radius 4px
      cursor pointer
      &.u-active
        background-color #3B68F0
        color #fff
  .u-chart
    margin-top 30px
    height 220px
.p-all
  position absolute
  right 0
  top 0
</style>
