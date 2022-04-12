<template lang="pug">
Card2(title='客户风险总览')
  .p-top-blocks
    TopBlock(
      v-for='item in cateState.topData'
      :key='item.key'
      :label='item.label'
      :value='item.value'
      :iconUrl='item.iconUrl'
    )
  .p-charts
    .u-chart
      ChartCates(
        :totalValue='cateState.chartData.totalValue'
        :dataList='cateState.chartData.dataList'
      )
    .u-chart(v-loading='reasonState.loading')
      ChartReason(
        :selected='selectedCate'
        :selectOptions='cateState.cateOptions'
        :dataList='reasonState.dataList'
        @changeCate='changeCate'
      )
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Card2 from './../card2'
import TopBlock from './topBlock'
import ChartCates from './chartCates'
import ChartReason from './chartReason'
import useCateDetail from './useCateDetail'
import useReasonDetail from './useReasonDetail'
export default {
  components: {
    Card2,
    TopBlock,
    ChartCates,
    ChartReason,
  },
  setup() {
    const reasonState = useReasonDetail()

    const state = reactive({
      selectedCate: '',
      cateState: null,
      reasonState
    })

    state.cateState = useCateDetail({
      success: () => {
        state.selectedCate = state.cateState.cateOptions?.[0]?.value ?? ''
        reasonState.getBarData({ riskType: state.selectedCate })
      }
    })

    function changeCate(v) {
      state.selectedCate = v
      reasonState.getBarData({ riskType: state.selectedCate })
    }

    return {
      ...toRefs(state),
      changeCate,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-top-blocks
  display flex
  /deep/.p-top-block
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
