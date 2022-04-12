<template lang="pug">
.p-chart-info(:class='useFor === "project" ? "u-project" : ""')
  .u-title {{ title }}
  .u-chart(ref='chartRef')
  .u-bars(v-if='useFor !== "project"')
    PercentBar.u-bar(
      label='通过结果数'
      :color='primaryColor'
      :sum='success'
      :percent='successPercent'
    )
    PercentBar.u-bar(
      label='拒绝结果数'
      color='#E95257'
      :sum='reject'
      :percent='rejectPercent'
    )
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import PercentBar from './percentBar'
import { getCircleOption1 } from './../chartOptions'

export default {
  components: {
    PercentBar,
  },
  props: {
    useFor: String, // 用途：credit、project
    title: String,
    primaryColor: {
      type: String,
      default: '#3BB5EF'
    },
    sum: Number,
    ongoing: Number,
    percent: String,
    success: Number,
    successPercent: Number,
    reject: Number,
    rejectPercent: Number,
  },
  setup(props) {
    const chartRef = ref()

    let chartState = null
    function renderChart() {
      const option = getCircleOption1({
        sum: props.sum,
        ongoing: props.ongoing,
        percent: props.percent,
        primaryColor: props.primaryColor,
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
        () => props.percent,
        () => props.sum,
        () => props.ongoing,
      ],
      () => renderChart()
    )

    return {
      chartRef
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-chart-info
  width 240px
  height 100%
  &.u-project .u-chart
    margin-top 40px
  .u-title
    margin-left 10px
    color #6D7278
    font-size 12px
  .u-chart
    margin 0 auto
    width 220px
    height 220px
  .u-bars
    margin 0 10px
    margin-top 18px
  .u-bar
    margin-top 6px
</style>
