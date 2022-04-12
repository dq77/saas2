<template lang="pug">
.p-chart-info
  .u-title 风险类型分布
  router-link.p-read-more-btn.u-absolute(
    :to='{name: "riskEvent"}'
    v-weblogs.click='"风险工作台-客户风险总览-风险类型分布-查看全部"'
  ) 查看全部 &gt;
  .u-chart(ref='chartRef')
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import { getCircleOption4 } from './../chartOptions'

export default {
  props: {
    totalValue: String,
    dataList: Array // 数据结构：[{ name: '企业经营风险排查', percent: '25%', value: 100 },]
  },
  setup(props) {
    const chartRef = ref()
    let chartState = null
    function renderChart() {
      const option = getCircleOption4({
        totalLabel: '风险事项(起)',
        totalValue: props.totalValue,
        color: ['#3B68F0', '#3BB5EF', '#00B4CC', '#F7B500', '#D3997A', '#7885AB'],
        data: props.dataList
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
        () => props.totalValue,
        () => props.dataList
      ],
      () => {
        renderChart()
      }
    )

    return {
      chartRef
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
  .u-chart
    height 300px
</style>
