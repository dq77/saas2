<template lang="pug">
.p-distribution
  .u-pie-main(v-if="dataSource.length")
    .u-pie-main
      #distribution
      .text 数量<br/>分布
    .u-canvas-legend-detail
      .u-canvas-legend-item(
        v-for="(item, index) in dataSource"
        :class="`item-${index + 1}`"
      )
        .u-canvas-legend-icon
        .u-canvas-legend-doc
          .u-canvas-legend-num-text {{ item.value }}
          .u-canvas-legend-name {{ item.name }}
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import { watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { pieOption } from './config'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    }
  },
  components: { Empty },
  setup(props) {
    const { perTimeout } = useTimeout()
    const {
      chartInit,
      setDataSource,
      setOption,
      chartClear
    } = useCharts({
      option: pieOption,
      id: 'distribution',
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      setDataSource(data)
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

    }
  }
}
</script>

<style lang="stylus" scoped>
colors = (#3B68F0 #3B88EF #3BDDEF #3BB5EF #00B4CC #7885AB)
.p-distribution
  height 100%
.u-pie-main
  display flex
  width 100%
  .u-pie-main
    width 100%
    max-width 280px
    margin-right 20px
    display flex
    flex-direction column
    justify-content center
    align-items center
    position relative
  .u-canvas-legend-detail
    padding 20px
    padding-left 35px
    display flex
    flex-wrap wrap
    flex 1
    background #F8F9FA
    align-content space-around
    .u-canvas-legend-item
      width 50%
      height 60px
      .u-canvas-legend-name
        color #7A869E
        font-size 12px
  .u-canvas-legend-item
    display flex
    align-items center
    .u-canvas-legend-icon
      width 10px
      height 10px
      background #6FCAFA
      margin-right 10px
    .u-canvas-legend-doc
      .u-canvas-legend-num-text
        color #494949
        font-size 18px
        font-weight bold
        margin-bottom 3px
      .u-canvas-legend-name
        color #9AA6B8
    for i in (1..6)
      &.item-{i} .u-canvas-legend-icon
        background-color colors[i - 1]
#distribution
  width 100%
  height 100%
  min-height 172px
.text
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 50px
  text-align center
  color #494949
>>>.echarts-tooltip-point
  .toolbox
    font-size 12px
    line-height 12px
    display flex
    justify-content space-between
    .left-box
      display flex
      margin-right 6px
      .icon
        height 12px
        width 12px
        margin-right 4px
    .num
      font-weight bold
</style>
