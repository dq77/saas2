<template lang="pug">
.p-charts
  .card-item.card-one
    .card-head 使用情况
    .card-chart
      .chart-left
        #chart-one
        .chart-desc
          .desc-one {{Number(baseInfo.useRate) ? (Number(baseInfo.useRate) * 100).toFixed(2) + '%' : '- -'}}
          .desc-two 使用率
      .chart-right
        .u-canvas-legend-item(
          v-for="(item, index) in dataUsed"
          :class="`item-${index + 1}`"
        )
          .u-canvas-legend-icon
          .u-canvas-legend-label {{item.name}}
          .u-canvas-legend-value {{item.value}}
  .card-item.card-two
    .card-head 评估记录
    .card-chart
      .chart-left
        #chart-two
        .chart-desc
          .desc-one {{Number(baseInfo.passRate) ? (Number(baseInfo.passRate) * 100).toFixed(2) + '%' : '- -'}}
          .desc-two 通过率
      .chart-right
        .u-canvas-legend-item(
          v-for="(item, index) in dataRecord"
          :class="`item-${index + 1}`"
        )
          .u-canvas-legend-icon
          .u-canvas-legend-label {{item.status}}
          .u-canvas-legend-value {{item.companyNum}}
          .u-canvas-legend-value {{item.ratio ? (item.ratio * 100).toFixed(2) + '%' : '-'}}
  .card-item.card-three
    .card-head 分数分段
    .card-chart
      .chart-left
        #chart-three
      .chart-right
        .u-canvas-legend-item(
          v-for="(item, index) in dataLevel"
          :class="`item-${index + 1}`"
        )
          .u-canvas-legend-icon
          .u-canvas-legend-label {{preciseLevel[item.grade]}}
          .u-canvas-legend-value {{item.companyNum}}
          .u-canvas-legend-value {{item.ratio ? (item.ratio * 100).toFixed(2) + '%' : '-'}}
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { chartConfigOne, chartConfigTwo, chartConfigThree } from './config'
import { preciseLevel } from '@/utils/enums'

export default {
  components: {},
  props: {
    baseInfo: {
      type: Object,
      defaultValue: () => {
        return {}
      }
    }
  },
  setup(props, { emit }) {
    const { perTimeout } = useTimeout()
    const state = reactive({
      dataUsed: [],
      usedState: {},
      dataRecord: [],
      recordState: {},
      dataLevel: [],
      levelState: {},
    })
    state.usedState = useCharts({
      option: chartConfigOne,
      id: 'chart-one',
      isInit: false
    })
    state.recordState = useCharts({
      option: chartConfigTwo,
      id: 'chart-two',
      isInit: false
    })
    state.levelState = useCharts({
      option: chartConfigThree,
      id: 'chart-three',
      isInit: false
    })
    const renderChart = (val) => {
      state.dataUsed = [
        { name: '待提交评估', value: val.using || 0 },
        { name: '已完成评估', value: val.use || 0 },
        { name: '剩余可评估', value: val.unUse || 0 },
      ]
      state.dataRecord = (val.evaluateRecordVOList || []).map(item => {
        return {
          ...item,
          name: item.status,
          value: Number(item.companyNum)
        }
      })
      state.dataLevel = (val.gradeDistributedVOList || []).map(item => {
        return {
          ...item,
          name: preciseLevel[item.grade],
          value: item.companyNum
        }
      })
      perTimeout(() => {
        // 设置数据
        state.usedState.setDataSource(state.dataUsed)
        state.usedState.setOption()
        state.usedState.chartInit()

        state.recordState.setDataSource(state.dataRecord)
        state.recordState.setOption()
        state.recordState.chartInit()

        state.levelState.setDataSource(state.dataLevel)
        state.levelState.setOption()
        state.levelState.chartInit()
      })
    }
    watch(() => props.baseInfo, (val, preVal) => {
      renderChart(val)
    }, { immediate: true })
    return {
      preciseLevel,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
colors = (#3B68F0 #3B88EF #3BB5EF #3BDDEF #00B4CC #7885AB)

.p-charts
  display flex
  justify-content center
  align-items center
  margin 10px 0
  .card-one
    flex 7
    margin-right 10px
  .card-two
    flex 9
    margin-right 10px
  .card-three
    flex 13
  .card-item
    background #fff
    border-radius 4px
    height 182px
    padding 20px
    .card-head
      font-size 14px
      color #383B42
      font-weight 500
    .card-chart
      display flex
      align-items center
      justify-content flex-start
      margin-top 15px
      .chart-left
        flex 100px 0 0
        position relative
        .chart-desc
          position absolute
          top 28px
          bottom 28px
          left 28px
          right 28px
          display flex
          align-items center
          justify-content center
          flex-flow column nowrap
          .desc-one
            font-size 16px
            color #383B42
          .desc-two
            font-size 12px
            color #9AA6B8
      .chart-right
        flex 1
        margin-left 20px
        display flex
        flex-flow column wrap
        max-height 90px
        justify-content center
        align-items flex-start
.u-canvas-legend-item
    // width 100px
    height 30px
    display flex
    align-items center
    .u-canvas-legend-icon
      width 10px
      height 10px
      background #6FCAFA
      margin-right 10px
    .u-canvas-legend-label
      color #9AA6B8
    .u-canvas-legend-value
      color #383B42
      margin-left 10px
    for i in (1..6)
      &.item-{i} .u-canvas-legend-icon
        background-color colors[i - 1]
#chart-one
  width 100px
  height 100px
#chart-two
  width 100px
  height 100px
#chart-three
  width 100px
  height 100px
>>>.echarts-tooltip-point
  .toolbox
    font-size 12px
    line-height 12px
    display flex
    justify-content space-between
    .left-box
      display flex
      margin-right 6px
      .icon
        height 12px
        width 12px
        margin-right 4px
    .num
      font-weight bold
</style>
