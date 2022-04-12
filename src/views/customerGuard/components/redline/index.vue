<template lang="pug">
.p-redline
  .p-title(v-if='!isDialog') 红线触发次数
    Popover(:content='vsRiskExplain')
  .p-redline-map(v-if="dataSource.length" :id='id')
  .u-empty-tips(v-else) {{ emptyText || '暂无数据' }}
</template>

<script>
import Popover from './popover'
import { watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { barOption, vsRiskExplain } from './config'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    isDialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'redline'
    },
    emptyText: String
  },
  components: { Popover },
  setup(props) {
    const { perTimeout } = useTimeout()
    const {
      chartInit,
      setDataSource,
      setOption,
      chartClear
    } = useCharts({
      option: barOption,
      id: props.id,
      isInit: false
    })
    // 设置option
    const _setDataSource = (data) => {
      const dataSource = data.map((item) => {
        return item.count
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
      vsRiskExplain
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-redline
  height 100%
.p-title
  color #494949
  font-size 14px
  font-weight 500
  z-index 1
  .p-tips
    font-size 12px
.p-label
  color #494949
  font-weight bold
.p-value
  font-weight normal
.p-redline-map
  width 95%
  height 270px
  z-index 0
.u-empty-tips
  height 100%
  color #CDD0D4
  display flex
  justify-content center
  align-items center
</style>
