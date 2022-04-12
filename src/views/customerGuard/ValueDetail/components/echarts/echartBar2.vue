<template lang="pug">
.p-module-content
  div(:id='id' v-if='!isEmpty' :style='"width: 100%; height: 100%"')
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import { watch, reactive, toRefs } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { deepCopy } from '@/utils/qjd'
import { barOptions2 } from './config'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: 'echartBar'
    },
    chartLegend: Array,
    chartYData: Array,
    options: Object
  },
  components: { Empty },
  setup(props) {
    const state = reactive({
      isEmpty: false,
      lineOptions: props.options || deepCopy(barOptions2)
    })

    const { perTimeout } = useTimeout()
    const setNewOption = ({newLegend, newXData, newYData}) => {
      state.lineOptions.legend.data = newLegend || []
      state.lineOptions.xAxis.data = newXData || []
      state.lineOptions.series = newYData || []
      return state.lineOptions
    }
    const {
      chartInit,
      setDataSource,
      setxData,
      setOption,
      chartClear
    } = useCharts({
      option: setNewOption({newLegend: props.chartLegend, newYData: props.chartYData}),
      id: props.id,
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const { xData = [], yDataList = [] } = data
      if (!xData.length) { state.isEmpty = true; return }
      setxData(xData)
      yDataList.forEach((item, index) => {
        setDataSource(item, index)
      })
    }
    watch(
      () => props.dataSource,
      (value) => {
        value && perTimeout(() => {
          // 设置数据
          setOption(setNewOption({newLegend: props.chartLegend, newYData: props.chartYData}))
          _setDataSource(value)
          // 初始化调用
          chartInit()
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        chartClear()
      }
    )
    return {
      ...toRefs(state)
    }
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
