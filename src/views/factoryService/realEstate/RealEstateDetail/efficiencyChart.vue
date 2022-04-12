<template lang="pug">
Card.p-card(title='经营效率' v-loading='loading')
  #efficiencyChart(v-if='dataSource && Object.keys(dataSource).length !== 0')
  .u-empty-tips(v-else) 数据暂未披露 敬请期待
</template>

<script>
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { barAndLineOption, efficiencyLegend } from './config'
import { watch } from '@vue/composition-api'
import Card from '@/components/Card'
import { deepCopy } from '@/utils/qjd'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  components: { Card },
  setup(props) {
    const { perTimeout } = useTimeout()

    const setNewOption = ({newLegend, newXData, newYData}) => {
      const option = deepCopy(barAndLineOption)
      option.legend.data = newLegend || []
      option.xAxis.data = newXData || []
      newLegend.map((item, key) => {
        option.series[key].name = newLegend[key]
        option.yAxis[key].name = newLegend[key]
      })
      return option
    }

    const {
      chartInit,
      setDataSource,
      setxData,
      chartClear
    } = useCharts({
      option: setNewOption({newLegend: efficiencyLegend}),
      id: 'efficiencyChart',
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const financeData = data
      const xData = []
      const chzzts = []
      const zzczzy = []
      for (const key in financeData) {
        xData.push(key)
        chzzts.push(financeData[key].chzzts)
        zzczzy.push(financeData[key].zzczzy)
      }
      setxData(xData)
      setDataSource(chzzts, 0)
      setDataSource(zzczzy, 1)
    }

    watch(
      () => props.dataSource,
      (value) => {
        value && perTimeout(() => {
          // 设置数据
          _setDataSource(value)
          // 初始化调用
          chartInit()
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        !value && chartClear()
      }
    )

    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
#efficiencyChart
  height 300px
</style>
