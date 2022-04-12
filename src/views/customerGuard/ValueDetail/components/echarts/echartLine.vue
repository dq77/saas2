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
import { lineOption, lineOption2 } from './config'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: 'echartLine'
    },
    type: { // y轴坐标  category  value 2种
      type: String,
      default: 'value'
    },
    chartLegend: Array,
    chartYData: Array,
    immediate: Boolean
  },
  components: { Empty },
  setup(props) {
    const state = reactive({
      isEmpty: false
    })
    const { perTimeout } = useTimeout()
    const setNewOption = ({newLegend, newYData}) => {
      const lineOptions = props.type === 'category' ? deepCopy(lineOption) : deepCopy(lineOption2)
      lineOptions.legend.data = newLegend || []
      lineOptions.series = newYData || []
      return lineOptions
    }
    const {
      chartInit,
      setDataSource,
      setxData,
      chartClear,
      setOption
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
        chartClear()
        const option = setNewOption({ newLegend: props.chartLegend, newYData: props.chartYData })
        setOption(option)
        // 设置数据
        _setDataSource(value)
        // 初始化调用
        perTimeout(() => {
          chartInit()
        })
      },
      {
        immediate: props.immediate
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
