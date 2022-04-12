<template lang="pug">
.p-echart
  .content
    #score_charts
</template>
<script>
import { nextTick, watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import { getOptions } from './config'

export default {
  props: {
    dataSource: Array
  },
  setup(props) {
    const chartApis = useCharts({
      option: {},
      id: 'score_charts',
      isInit: false
    })
    // watch
    watch(
      () => props.dataSource,
      (val) => {
        const options = getOptions({ data: val })
        console.log(12345, options)
        chartApis.setOption(options)
        nextTick(() => chartApis.chartInit())
      }
    )

    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-echart
  padding 20px 20px 0px 20px
  position relative
  border 1px solid rgba(151, 151, 151, 0)
  border-radius 8px
.content
  width: 100%
  height: 320px
  #score_charts
    height 100%
    width: 100%
</style>

