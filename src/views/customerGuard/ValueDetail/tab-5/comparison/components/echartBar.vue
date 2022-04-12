<template lang="pug">
.p-module-content
  div(:id='id' v-if='dataSource.xData && dataSource.xData.length' :style='"width: 100%; height: 100%"')
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import { watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: 'echartBar'
    },
    options: Object
  },
  components: { Empty },
  setup(props) {
    const { perTimeout } = useTimeout()
    const {
      chartInit,
      setDataSource,
      setxData,
      chartClear,
      setOption
    } = useCharts({
      option: props.options || {},
      id: props.id,
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const { xData, yData } = data
      setxData(xData)
      setDataSource(yData)
    }
    watch(
      () => props.dataSource,
      (value) => {
        if (JSON.stringify(value) === '{}') return
        chartClear()
        setOption(props.options)
        _setDataSource(value)
        perTimeout(() => {
          chartInit()
        })
      }, {
        immediate: true
      }
    )
    return {}
  }

}
</script>

<style lang="stylus" scoped>
.p-module-content
  width 100%
  height 100%
  padding 15px 20px
  position relative
</style>
