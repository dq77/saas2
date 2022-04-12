<template lang="pug">
.p-chart-info
  .u-title 深度评估结果分布
  router-link.p-read-more-btn.u-absolute(
    :to='{name: "projectTaskList"}'
    v-weblogs.click='"风险工作台-评估结果总览-tab：项目评估-深度评估结果分布-查看全部"'
  ) 查看全部 &gt;
  .u-chart(ref='chartRef')
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import { getCircleOption3 } from './../chartOptions'

export default {
  props: {
    totalValue: String, // 已评估客户总数
    dataList: Array, // 图表数据，格式[{ name: '通过客户数', value: 100 },{ name: '拒绝客户数', value: 100 },]
  },
  setup(props) {
    const chartRef = ref()

    let chartState = null
    function renderChart() {
      const option = getCircleOption3({
        totalLabel: '已评估客户总数',
        totalValue: props.totalValue,
        color: ['#3B68F0', '#F7B500'],
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
  position relative
  height 100%
  .u-title
    color #6D7278
    font-size 12px
  .u-chart
    height 300px
</style>
