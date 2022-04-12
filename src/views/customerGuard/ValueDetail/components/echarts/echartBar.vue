<template lang="pug">
.p-module-content
  div(:id='id' v-if='!isEmpty' :style='"width: 100%; height: 100%"')
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import { watch, ref } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { barOptions, barOptionsCategory } from './config'
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
    type: { // y轴坐标  category  value 2种
      type: String,
      default: 'value'
    }
  },
  components: { Empty },
  setup(props) {
    const isEmpty = ref(false)
    const { perTimeout } = useTimeout()
    const {
      chartInit,
      setDataSource,
      setxData,
      setOption,
      chartClear
    } = useCharts({
      option: props.type === 'value' ? barOptions : barOptionsCategory,
      id: props.id,
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const { xData, yData } = data
      if (!xData.length) { isEmpty.value = true; return }
      setxData(xData)
      setDataSource(yData)
    }
    watch(
      () => props.dataSource,
      (value) => {
        value && perTimeout(() => {
          // 设置数据
          _setDataSource(value)
          setOption()
          // 初始化调用
          chartInit()
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        !value && chartClear()
      }
    )
    return {
      isEmpty
    }
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
