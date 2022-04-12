<template lang="pug">
.p-wrap(v-loading='detailState.circleLoading')
  .p-blocks
    .u-block
      TopBlock(:list='list1')
    .u-block
      TopBlock(:list='list2')
  .p-charts
    .u-chart
      CreditChartCircle(
        :totalValue='detailState.riskLevelCustomerCount'
        :dataList='detailState.chartCircle'
      )
    .u-chart(v-loading='detailState.barLoading')
      CreditChartBar(
        @clickLevel='clickLevel'
        :taskList='detailState.taskList'
        :customerList='detailState.customerList'
        :activeTab='activeTab'
      )
</template>

<script>
import { reactive, toRefs, computed, onMounted } from '@vue/composition-api'
import TopBlock from './topBlock'
import CreditChartCircle from './creditChartCircle'
import CreditChartBar from './creditChartBar'
import useCreditDetail from './useCreditDetail'

export default {
  components: {
    TopBlock,
    CreditChartCircle,
    CreditChartBar,
  },
  setup() {
    const detailState = useCreditDetail()
    const state = reactive({
      detailState,
      activeTab: 'A'
    })
    const list1 = computed(() => [
      { label: '通过任务数', value: detailState.passTaskCount },
      { label: '通过客户数', value: detailState.passCustomerCount },
    ])
    const list2 = computed(() => [
      { label: '拒绝任务数', value: detailState.rejectTaskCount },
      { label: '拒绝客户数', value: detailState.rejectCustomerCount },
    ])
    const clickLevel = (level) => {
      state.activeTab = level
      detailState.getBarData({ riskLevel: state.activeTab })
    }
    onMounted(() => {
      detailState.getBarData({ riskLevel: state.activeTab })
    })
    return {
      list1,
      list2,
      ...toRefs(state),
      clickLevel,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-blocks
  display flex
  width 100%
  .u-block
    flex 1
    margin-left 20px
    &:first-child
      margin-left 0
.p-charts
  display flex
  margin-top 20px
  border 1px solid #ECECEF
  .u-chart
    flex 1
    padding 20px 30px
    &:first-child
      border-right 1px solid #ECECEF
</style>
