<template lang="pug">
Card.p-card(title='销售金额/拿地金额趋势' v-loading='loading')
  #saleMoneyChart(v-if='dataSource.length')
  .u-empty-tips(v-else) 暂无信息
</template>

<script>
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { doubleLineOption, saleMoneyLegend, saleMoneyYData } from './config'
import { watch, reactive, toRefs } from '@vue/composition-api'
import Card from '@/components/Card'
import { deepCopy } from '@/utils/qjd'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  components: { Card },
  setup(props) {
    const state = reactive({
      loading: true,
      doubleLineOptions: deepCopy(doubleLineOption)
    })
    const { perTimeout } = useTimeout()

    const setNewOption = ({newLegend, newXData, newYData}) => {
      state.doubleLineOptions.legend.data = newLegend || []
      state.doubleLineOptions.xAxis.data = newXData || []
      state.doubleLineOptions.series = newYData || []
      return state.doubleLineOptions
    }

    const {
      chartInit,
      setDataSource,
      setxData,
      chartClear
    } = useCharts({
      option: setNewOption({newLegend: saleMoneyLegend, newYData: saleMoneyYData}),
      id: 'saleMoneyChart',
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const saleData = data
      const xData = []
      const sellMoney = []
      const acquireMoney = []
      for (const key in saleData) {
        xData.push(key)
        sellMoney.push(saleData[key].sellMoney)
        acquireMoney.push(saleData[key].acquireMoney)
      }
      setxData(xData)
      setDataSource(sellMoney, 0)
      setDataSource(acquireMoney, 1)
    }

    watch(
      () => props.dataSource,
      (value) => {
        value && value.length && perTimeout(() => {
          // 设置数据
          _setDataSource(value)
          // 初始化调用
          chartInit()
          state.loading = false
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        !value && chartClear()
      }
    )

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
#saleMoneyChart
  height 300px
</style>
