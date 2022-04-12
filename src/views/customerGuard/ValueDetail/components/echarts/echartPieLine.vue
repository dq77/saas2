<template lang="pug">
.p-distribution
  .u-pie-main(v-if="dataSource.length")
    div(:id='id' :style='"width: 100%; height: 100%"')
    .p-text(v-html='text')
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import { watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { pieOptionWithLabels } from './config'
import { deepCopy } from '@/utils/qjd'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    id: {
      type: String,
      default: 'echartPieLine'
    },
    text: String
  },
  components: { Empty },
  setup(props) {
    const { perTimeout } = useTimeout()
    const setNewOption = (data) => {
      const option = deepCopy(pieOptionWithLabels)
      option.legend.formatter = function(name) {
        var value = 0
        for (var i = 0, l = data.length; i < l; i++) {
          if (data[i].name === name) {
            value = data[i].value
          }
        }
        var arr = [
          '{a|' + value + '}',
          '{b|' + name + '}'
        ]
        return arr.join('\n')
      }
      // const newLegend = data && data.map(item => {
      //   return item.name
      // })
      // option.legend.data = newLegend
      return option
    }

    const {
      chartInit,
      setDataSource,
      setOption,
      chartClear
    } = useCharts({
      option: pieOptionWithLabels,
      id: props.id,
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const dataSource = data.map((item) => {
        return {
          name: item.name,
          value: item.value
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
          const option = setNewOption(props.dataSource)
          setOption(option)
          // 初始化调用
          chartInit()
        })
        // 切换后的需清空画布,保证画布切换tab和窗口resize时重画
        !value && chartClear()
      }
    )

    return {}
  }
}
</script>

<style lang="stylus" scoped>
.p-distribution
  width 100%
  height 100%
  padding 10px 30px
  position relative
.p-text
  position absolute
  left 25%
  top 50%
  width 50px
  height 50px
  transform translate(-25px, -25px)
  display flex
  justify-content center
  align-items center
  color #494949
  text-align center
.u-pie-main
  width 100%
  height 100%
  // max-width 460px
  margin 0 auto
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
