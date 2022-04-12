<template lang="pug">
.percent(v-loading="loading")
  Title(:title="'待收应收账款占比'")
  #percent-chart(v-if="isShow")
  Empty(v-else)
  .percent-info(v-if="isShow")
    .percent-info-detail
      span.percent-info-circle
      span.percent-info-money 总应收账款: {{ loanAmount }}万元
    .percent-info-detail
      span.percent-info-circle
      span.percent-info-money 总剩余应收账款: {{ debtAmount }}万元
</template>
<script>
import { onMounted, reactive, toRefs } from '@vue/composition-api'
import Title from './title'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import ajaxStore from '@/apis'
import Empty from '@/components/qjd/empty'
import useShow from 'hooks/useShow'
import useAsync from 'hooks/useAsync'
import { toAmountStr } from '@/utils/util'

export default {
  components: {
    Title,
    Empty
  },
  setup() {
    const { credit: { dealerDebtTotal } } = ajaxStore
    const { perTimeout } = useTimeout()
    // 是否显示
    const {
      isShow,
      checkShow
    } = useShow()
    const state = reactive({
      debtAmount: 0,
      loanAmount: 0
    })
    // option
    const option = {
      series: [{
        type: 'gauge',
        progress: { show: true, width: 20 },
        color: ['#25BECD'],
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        axisLine: { lineStyle: { width: 20 } },
        detail: {
          valueAnimation: true,
          fontSize: 30,
          fontWeight: 'normal',
          offsetCenter: [0, '30%'],
          formatter: '{value}%',
        },
        data: [{ value: 0 }]
      }]
    }
    // chart
    const {
      setDataSource,
      chartInit
    } = useCharts({
      option,
      id: 'percent-chart',
      isInit: false
    })
    // 成功回调
    const successCallBack = ({ code, data }) => {
      if (code === '0' && data) {
        checkShow(!!data)
        const { debtAmount = 0, loanAmount = 0 } = data || {}
        state.debtAmount = debtAmount ? toAmountStr(debtAmount, 2, true, true) : 0
        state.loanAmount = loanAmount ? toAmountStr(loanAmount, 2, true, true) : 0
        const value = (debtAmount / loanAmount * 100).toFixed(2)
        setDataSource([{ value }])
      } else {
        checkShow(false)
      }
    }
    // 接口
    const { doResult, loading } = useAsync({
      request: dealerDebtTotal,
      init: false,
      successCallBack
    })

    onMounted(() => doResult().then(val => val && perTimeout(chartInit)))

    return {
      isShow,
      loading,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.percent
  width 28vw
  display flex
  flex-direction column
  position relative
  height 25vw
  min-height 280px
  min-width 320px
  margin-right 20px
  background #F8F9FA
  overflow hidden
  #percent-chart
    width 28vw
    min-width 320px
    height 23vw
    min-height 280px
    margin-top -20px
    overflow hidden
    position relative
  .percent-info
    width 100%
    display flex
    position absolute
    left 0
    bottom 0
    display flex
    justify-content center
    font-weight: 500;
    color: #494949;
    padding 2vw 30px
    .percent-info-detail
      flex 1
      display flex
      justify-content center
      margin 0 10px
      white-space nowrap
</style>
