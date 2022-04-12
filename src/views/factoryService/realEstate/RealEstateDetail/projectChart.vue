<template lang="pug">
Card.p-card(title='项目数据' v-loading='loading')
  #projectChart(v-if='result && result.length')
  .u-empty-tips(v-else) 暂无信息
</template>

<script>
import { watch } from '@vue/composition-api'
import Card from '@/components/Card'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { toAreaName } from '@/utils/util'
import useProjectSummary from '../hooks/useProjectSummary'
import { projectSummaryOption } from './config'
export default {
  props: {
    companyName: {
      type: String,
    }
  },
  components: { Card },
  setup(props) {
    const { perTimeout } = useTimeout()

    const { loading, result, doResult } = useProjectSummary()

    const {
      chartInit,
      setDataSource,
      setxData,
      chartClear
    } = useCharts({
      option: projectSummaryOption,
      id: 'projectChart',
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const xData = []
      const yData = []
      data.map((item) => {
        xData.push(toAreaName(item.name))
        yData.push(item.value)
      })
      if (data.length) {
        setxData(xData)
        setDataSource(yData)
      }
    }

    watch(
      () => result.value,
      (value) => {
        value && perTimeout(() => {
          // 设置数据
          _setDataSource(value)
          // 初始化调用
          chartInit()
          loading.value = false
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        !value && chartClear()
      }
    )

    watch(
      () => props.companyName,
      (value) => {
        doResult({
          companyName: value
        })
      }
    )

    return {
      loading,
      result
    }
  }

}
</script>

<style lang="stylus" scoped>
@import './index.styl';
#projectChart
  height 500px
</style>
