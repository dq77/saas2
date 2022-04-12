<template lang="pug">
.wait
  .wait-chart
    #ovedue_bar
  .wait-unit 单位：元
</template>
<script>
import { watch } from '@vue/composition-api'
import { getBaseBar } from '@/consts/baseBar'
import useTimeout from 'hooks/useTimeout'
import useCharts from 'hooks/useCharts'

export default {
  props: {
    dataSource: Object
  },
  setup(props) {
    // perTimeout
    const { perTimeout } = useTimeout()
    // useCharts
    const {
      setDataSource,
      chartInit
    } = useCharts({
      option: getBaseBar({
        barWidth: 40,
        labelMaxLen: 8,
        grid: { left: '3%', right: '8%' },
        xData: ['累计催回金额总和', '逾期收回金额总和']
      }),
      id: 'ovedue_bar',
      isInit: false
    })
    // watch
    watch(
      () => props.dataSource,
      val => {
        setDataSource([val?.collectionTotalAmount ?? 0, val?.overdueCollectionAmount ?? 0])
        perTimeout(chartInit)
      }
    )
  },
}
</script>
<style lang="stylus" scoped>
.wait
  width 100%
  height 100%
  position relative
  box-sizing border-box
  .wait-chart
    width 100%
    height 100%
    position relative
    #ovedue_bar
      position absolute
      left 0
      top -20px
      width 110%
      height 110%
      left 50%
      transform translate(-48%, 0)
  .wait-unit
    position: absolute
    right: 0
    top: 0
    color: #383B42
</style>
