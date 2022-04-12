<template lang="pug">
.history_box(v-loading="loading")
  .header
    span 当前逾期分布情况
  span.title 逾期金额(元)
  .content
    #history_charts
</template>
<script>
import { nextTick, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useCharts from 'hooks/useCharts'
import { getOptions } from './config'
import { getY } from './util'

export default {
  props: {
    dataSource: Object
  },
  setup(props) {
    // ajax
    const { receive: { getOverdueAllDataList } } = ajaxStore
    // 接口
    const { doResult, loading } = useAsync({ request: getOverdueAllDataList, init: false })
    // chart
    const chartApis = useCharts({
      option: {},
      id: 'history_charts',
      isInit: false
    })
    // watch
    watch(
      () => props.dataSource,
      (val) => {
        const data = []
        const { highestOverdueDays } = val ?? {}
        const { max, splitNumber } = getY(highestOverdueDays)
        doResult().then((res) => {
          const { pagedRecords } = res?.data ?? {}
          pagedRecords && pagedRecords.forEach(item => {
            data.push([item?.overdueAmount, item?.overdueDays, item])
          })
          const options = getOptions({ max, splitNumber, data })
          chartApis.setOption(options)
          nextTick(() => chartApis.chartInit())
        })
      }
    )

    return {
      loading
    }
  }
}
</script>
<style lang="stylus" scoped>
.history_box
  background #fff
  margin-bottom 10px
  padding 20px 20px 30px 20px
  position relative
.title
  position: absolute
  bottom: 10px
  right: 10px
  color: #777
.header
  display flex
  justify-content: space-between;
  margin-bottom 10px
.content
  width: 100%
  height: 400px
  #history_charts
    height 100%
    width: 100%
</style>

