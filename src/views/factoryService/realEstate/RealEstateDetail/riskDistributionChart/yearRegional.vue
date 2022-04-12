<template lang="pug">
.p-module-type-content
  #yearRegional(v-if='dataSource.length')
  .u-empty-tips(v-else) 暂无信息
</template>

<script>
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { riskChartOption } from '../config'
import { watch } from '@vue/composition-api'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { perTimeout } = useTimeout()

    const {
      chartInit,
      setDataSource,
      setxData,
      chartClear
    } = useCharts({
      option: riskChartOption,
      id: 'yearRegional',
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const xData = []
      const yData = []
      data.map((item) => {
        xData.push(item.keyName || '')
        yData.push(item.value)
      })
      setxData(xData)
      setDataSource(yData)
    }

    const init = (value) => {
      value && value.length && perTimeout(() => {
        // 设置数据
        _setDataSource(value)
        // 初始化调用
        chartInit()
      })
      // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
      !value && chartClear()
    }

    init(props.dataSource)

    watch(
      () => props.dataSource,
      (value) => {
        init(value)
      }
    )
  }
}
</script>

<style lang="stylus" scoped>
@import '../index.styl';
#yearRegional
  height 300px
  padding-right 20px
  margin-right 20px
</style>
