<template lang='pug'>
.pie
  .chart-pie(:id='id')
  ul.pie-ul
    .pie-li(v-for='(item, index) in data' :key='index')
      .pie-li__value {{ item.isAmount ? toAmountStr(item.value, 2, true) : item.value.toLocaleString() }}
      .pie-li__name {{ item.name }}
</template>

<script>
import { watch } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { toAmountStr } from '@/utils/util'

export default {
  props: {
    id: String,
    option: Object,
    data: Array,
    dataSource: Array
  },
  setup (props) {
    const { perTimeout } = useTimeout()
    const {
      setDataSource,
      chartInit,
      chartClear,
      setOption
    } = useCharts({
      option: props.option,
      id: props.id,
      isInit: false
    })

    const initPie = (val) => {
      setDataSource(val)
      // 存在charts实例调用，否则不调用
      setOption()
      chartInit()
    }

    watch(() => props.dataSource, (val) => {
      val && perTimeout(() => {
        initPie(val)
      })
      !val && chartClear()
    }, {
      immediate: true
    })
    return {
      toAmountStr
    }
  }
}
</script>

<style lang='stylus' scoped>
.pie
  width 50%
  height 100%
  min-width 260px
  padding-left 50px
  padding-right 50px
  position relative
.chart-pie
  width 100%
  height 100%
  >>>canvas
    z-index 1
.pie-ul
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content center
  align-items center
.pie-li
  text-align center
  margin-bottom 15px
  &:last-child
    margin-bottom 0
  &__name
    margin-bottom 6px
    font-size 12px
    color #9AA6B8
    line-height 17px
  &__value
    font-size 18px
    color #394D78
    line-height 22px

@media (max-width: 1366px)
  .pie
    width 260px
    padding-left 20px
    padding-right 20px
</style>
