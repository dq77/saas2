<template lang="pug">
.p-wrap(v-loading='detailState.loading')
  .p-charts
    .u-chart
      ProjectChartQuick(
        :totalValue='detailState.quick.totalValue'
        :dataList='detailState.quick.chart'
      )
    .u-chart
      ProjectChartDeep(
        :totalValue='detailState.deep.totalValue'
        :dataList='detailState.deep.chart'
      )
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import ProjectChartQuick from './projectChartQuick'
import ProjectChartDeep from './projectChartDeep'
import useProjectDetail from './useProjectDetail'

export default {
  components: {
    ProjectChartQuick,
    ProjectChartDeep,
  },
  setup() {
    const detailState = useProjectDetail()
    const state = reactive({
      detailState,
    })
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="stylus" scoped>
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
