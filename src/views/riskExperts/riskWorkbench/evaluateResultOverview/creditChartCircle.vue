<template lang="pug">
.p-chart-info
  .u-title 客户风险评级分布
  router-link.p-read-more-btn.u-absolute(
    :to='{name: "creditTaskList"}'
    v-weblogs.click='"风险工作台-评估结果总览-tab：赊销评估-客户风险等级分布-查看全部"'
  ) 查看全部 &gt;
  .u-chart(ref='chartRef')
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import { getCircleOption2 } from './../chartOptions'

export default {
  props: {
    totalValue: String,
    dataList: Array
  },
  setup(props) {
    const chartRef = ref()

    let chartState = null
    function renderChart({
      totalValue,
      data
    }) {
      if (!chartState) return
      const option = getCircleOption2({
        totalLabel: '风险评级总客户数',
        color: ['#3B68F0', '#3BB5EF', '#F7B500', '#D3997A', '#7885AB'],
        totalValue,
        data
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
      renderChart({
        totalValue: props.totalValue,
        data: props.dataList,
      })
    })

    watch(
      [
        () => props.totalValue,
        () => props.dataList
      ],
      () => {
        renderChart({
          totalValue: props.totalValue,
          data: props.dataList,
        })
      }
    )

    return {
      chartRef,
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
