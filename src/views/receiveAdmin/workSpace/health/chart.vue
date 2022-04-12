<template lang="pug">
.health-overview(v-loading="loading")
  Legend(:isShow='isShow' @clickCheckOverdue="clickCheckOverdue")
  .health-overview-chart(:style="{'margin-top': isShow ? '' : '24px'}")
    #health-overview-chart(v-if="isShow")
    Empty(v-else)
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Legend from './legend'
import Empty from '../components/empty'
import ajaxStore from '@/apis'
import useBar from './useBar'
import { getBaseBar } from './baseBar'

export default {
  components: {
    Legend,
    Empty
  },
  setup() {
    // ajax
    const { receive: { getReceivableHealthYearView, getReceivableHealthMonthView } } = ajaxStore
    // state
    const state = reactive({
      current: 1
    })
    // chart
    const {
      isShow,
      loading,
      clickHandle
    } = useBar({
      id: 'health-overview-chart',
      monthRequest: getReceivableHealthMonthView,
      yearRequest: getReceivableHealthYearView,
      option: getBaseBar({ grid: { left: '3%', right: '8%' } }),
      current: state.current
    })
    // methods
    const clickCheckOverdue = (current) => {
      state.current = current
      clickHandle(current)
    }
    return {
      clickCheckOverdue,
      isShow,
      loading,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.health-overview
  flex 1
  box-sizing border-box
  padding 0 20px
  border-right 1px solid #EAEBEE
  .health-overview-chart
    width 100%
    height 295px
    position relative
    #health-overview-chart
      position absolute
      left 0
      top -20px
      width 110%
      height 110%
      left 50%
      transform translate(-48%, 0)
</style>
