<template lang="pug">
.p-module-content
  div(:id='id' v-if='dataSource.xData && dataSource.xData.length' :style='"width: 100%; height: 100%"')
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import { watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { deepCopy } from '@/utils/qjd'
import { barAndLineOption } from './config'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: 'echartPieLine'
    },
    chartLegend: {
      type: Array,
      default: () => ([])
    },
    symbol: {
      type: String,
      default: 'emptyCircle'
    }
  },
  components: { Empty },
  setup(props) {
    const { perTimeout } = useTimeout()
    const setNewOption = ({newLegend, newXData}) => {
      const option = deepCopy(barAndLineOption)
      option.legend.data = newLegend || []
      option.xAxis.data = newXData || []
      newLegend.map((item, key) => {
        option.series[key].name = newLegend[key]
        option.series[key].symbol = props.symbol
        option.yAxis[key].name = newLegend[key]
      })
      return option
    }
    const {
      chartInit,
      setDataSource,
      setxData,
      chartClear,
      setOption
    } = useCharts({
      option: setNewOption({ newLegend: props.chartLegend }),
      id: props.id,
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const { xData = [], yDataList = [] } = data
      if (!xData.length) return
      setxData(xData)
      yDataList.forEach((item, index) => {
        setDataSource(item, index)
      })
    }
    watch(
      () => props.dataSource,
      (value) => {
        value && perTimeout(() => {
          setOption(setNewOption({ newLegend: props.chartLegend }))
          // 设置数据
          _setDataSource(value)
          // 初始化调用
          chartInit()
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        chartClear()
      }
    )
    return {}
  }

}
</script>

<style lang="stylus" scoped>
.p-module-content
  width 100%
  height 100%
  padding 15px 20px
  position relative
</style>
