<template lang="pug">
.p-module-type-content
  #caseDistribution(v-if='dataSource.length')
  .u-empty-tips(v-else) 暂无信息
</template>

<script>
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { riskPieChartOption } from '../config'
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
      chartClear
    } = useCharts({
      option: riskPieChartOption,
      id: 'caseDistribution',
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const pieData = []
      data.map((item) => {
        pieData.push({
          name: item.keyName,
          value: item.value
        })
      })
      setDataSource(pieData)
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
#caseDistribution
  height 300px
  padding-right 20px
  margin-right 20px
</style>
