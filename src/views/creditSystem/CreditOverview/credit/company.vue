<template lang="pug">
.company(v-loading="loading")
  .company-content
    .company-chart-box
      span.company-chart-title(v-show="isShow && dataSource") {{ title }}
      #company-chart(v-if="dataSource")
      Empty(v-else)
    .company-year
      .company-title 企业年度授信（万元）
      .company-box
        .company-info
          .company-info-content
            .company-info-left
              span.company-info-rect
              div
                span.company-money {{ dataSource && dataSource.sumAmountInUse ? dataSource.sumAmountInUse : '0' }}
                span.company-label 年度授信已使用额度
            .company-info-right
              span.company-money {{ dataSource && dataSource.sumCreditLine ? dataSource.sumCreditLine : '0' }}
              span.company-label 厂家年度授信总额
        .company-info
          .company-info-content
            .company-info-left
              span.company-info-other-rect
              div
                span.company-money {{ dataSource && dataSource.remainingAmount ? dataSource.remainingAmount : '0' }}
                span.company-label 年度授信剩余额度
            .company-info-right
              span.company-money {{ dataSource ? dataSource.quotaPercentage || dataSource.quotaPercentage === 0 ? `${dataSource.quotaPercentage}%` : '0%' : '0%' }}
              span.company-label 使用额度占比
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { pieOption } from './consts'
import Empty from '@/components/qjd/empty'

export default {
  props: {
    title: String,
    dataSource: Object,
    loading: Boolean
  },
  components: {
    Empty
  },
  setup(props) {
    const { perTimeout } = useTimeout()
    const state = reactive({
      isShow: true
    })

    // chart
    const {
      setDataSource,
      chartInit,
      chartClear,
      setOption
    } = useCharts({
      option: pieOption,
      id: 'company-chart',
      mouseover: () => { state.isShow = false },
      mouseout: () => { state.isShow = true },
      isInit: false
    })
    // 设置option
    const _setDataSource = ({ sumAmountInUse = 0, remainingAmount = 0 }) => {
      const dataSource = [
        {value: sumAmountInUse || 0, name: '年度授信已使用额度'},
        {value: remainingAmount || 0, name: '年度授信剩余额度'}
      ]
      setDataSource(dataSource)
    }

    watch(
      () => props.dataSource,
      (value) => {
        value && perTimeout(() => {
          // 设置数据
          _setDataSource(value)
          // 存在charts实例调用，否则不调用
          setOption()
          // 初始化调用
          chartInit()
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
@import './company.styl';
</style>
