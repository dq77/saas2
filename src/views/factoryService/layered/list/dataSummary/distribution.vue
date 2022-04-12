<template lang="pug">
.p-distribution
  .p-title 经销商分数分布
  .u-pie-main(v-if='dataSource.length')
    .u-pie-main
      #distribution
      .text 分数<br/>分布
    .u-pie-legend-main
      .u-canvas-legend-detail
        .u-canvas-legend-item(v-for='(item, index) in dataSource' :class='`item-${index + 1}`')
          .u-canvas-legend-icon
          .u-canvas-legend-doc
            .u-canvas-legend-num-text {{(item.percent * 100).toFixed(0)}}%
            .u-canvas-legend-name(v-if='item.name === "B"') 触发红线
            .u-canvas-legend-name(v-else) {{item.name}}
  .u-empty-tips(v-else) 暂无数据,请点击下方导入经销商按钮
</template>

<script>
import { watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { pieOption } from './config'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
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
      const dataSource = data.map((item) => {
        return {
          name: item.name === 'B' ? '触发红线' : item.name,
          value: item.count
        }
      })
      setDataSource(dataSource)
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
colors = (#3B68F0 #3B88EF #3BB5EF #3BDDEF #00B4CC #7885AB)
.p-title
    color #494949
    font-size 14px
.u-pie-main
    display flex
    margin-left -20px
    .u-pie-main
        width 250px
        flex 1 0 250px
        display flex
        flex-direction column
        justify-content center
        align-items center
        position relative
    .u-pie-legend-main
        background #F8F9FA
        flex 2 0 auto
        padding 20px
        padding-left 35px
    .u-canvas-legend-detail
        height 230px
        display flex
        flex-direction column
        justify-content space-around
        flex-wrap wrap
        .u-canvas-legend-item
            height 60px
            .u-canvas-legend-name
                color #7A869E
                font-size 12px
    .u-canvas-legend-item
        width 120px
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
                span
                    margin-left 5px
        for i in (1..6)
          &.item-{i} .u-canvas-legend-icon
            background-color colors[i - 1]
.u-empty-tips
    margin 95px 0 145px 0
    text-align center
    color #CDD0D4
#distribution
    width 250px
    height 250px
.text
    width 50px
    padding-top 2px
    text-align center
    color #494949
    position absolute
    top 125px
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
