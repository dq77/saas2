<template lang="pug">
.p-chart-info
  .u-title 风险原因分布
  .u-chart.p-height(ref='chartRef')
  EmptyData.p-height.p-empty(v-show='!dataList.length')
  .u-select
    el-select(:value='selected' @change='changeCate')
      el-option(
        v-for='(item) in selectOptions'
        :key='item.label'
        :label='item.label'
        :value='item.value'
      )
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import { weblogsDom } from '@/utils/qjd/weblogs'
import EmptyData from '@/components/EmptyData'
import { getBarOption2 } from './../chartOptions'
import { riskCateTree } from './../config'

export default {
  components: {
    EmptyData,
  },
  props: {
    selected: String, // 选中的下拉项
    selectOptions: Array, // 下拉选项，格式为[{ label, value }]
    dataList: Array, // 图标数据，格式为[{ riskName, riskNum }]
  },
  setup(props, { emit }) {
    const chartRef = ref()
    let chartState = null
    function renderChart() {
      const yAxisData = []
      const data = []
      let dataZoomStart = 0
      props.dataList.forEach(item => {
        yAxisData.push(item.riskName)
        data.push(item.riskNum)
      })
      if (data.length > 8) { // 计算滚动轴的高度，默认为[100, 0]，数据量超过8行则滚动轴缩短
        dataZoomStart = Math.round((1 - 8 / data.length) * 100)
      }
      const option = getBarOption2({
        yAxisData,
        data,
        dataZoomStart,
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
      () => props.dataList,
      () => renderChart()
    )

    const changeCate = (v) => {
      emit('changeCate', v)
      weblogsDom('风险工作台-客户风险总览-风险原因分布-下拉选择', { cate: v })
    }

    return {
      chartRef,
      riskCateTree,
      changeCate,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-height
  height 300px
.p-chart-info
  position relative
  height 100%
  .u-title
    color #6D7278
    font-size 12px
  .u-select
    position: absolute;
    right: 0;
    top: -9px;
.p-empty
  position absolute
  top 20px
  width 100%
  background #fff
</style>
