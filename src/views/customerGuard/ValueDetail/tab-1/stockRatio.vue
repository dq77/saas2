<template lang='pug'>
.p-ratio
  .p-echart(v-if='!isEmpty')
    .p-cycle(:style='{"left": cycleLeft}')
      .p-cycle-inner(:style='{"background": color}')
        .p-cycle-result(:style='{"color": color}') {{ dataSource }}
    .p-row-block
      .p-row.p-row-1
      .p-row.p-row-2
    .p-col-block
      .p-col(v-for='item in 5' :key='item' :class='`p-col-${item}`')
    .p-progress-bar
      .u-progress-li(v-for='(item, index) in list' :key='index' :class='`u-progress-li-${index+1}`')
        span.u-progress-li-label
          span {{ item.label }}
          span(v-if='index === 4') 100+
      .u-progress-arrow(:style='{ "border-bottom-color": color, "left": arrowLeft }')
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import { reactive, toRefs, computed, watch } from '@vue/composition-api'

export default {
  components: {
    Empty
  },
  props: {
    dataSource: {
      type: Number,
      default: 0
    },
    isEmpty: Boolean
  },
  setup(props) {
    const state = reactive({
      colors: ['#B9E6FF', '#78B2FF', '#3B68F0', '#042DA8', '#FF3E3E'],
      list: [
        { label: 0 },
        { label: 25 },
        { label: 50 },
        { label: 75 },
        { label: 100 }
      ],
      cycleLeft: 0,
      arrowLeft: 0,
    })
    const color = computed(() => {
      const dataSource = props.dataSource
      if (dataSource > 99) {
        return state.colors[4]
      } else if (dataSource > 74) {
        return state.colors[3]
      } else if (dataSource > 49) {
        return state.colors[2]
      } else if (dataSource > 24) {
        return state.colors[1]
      } else {
        return state.colors[0]
      }
    })

    watch(() => props.dataSource, (val) => {
      const left = val * 0.8
      if (val > 100) {
        state.cycleLeft = left < 92 ? `${left}%` : '92%'
        state.arrowLeft = left < 92 ? `${left}%` : '92%'
      } else {
        state.cycleLeft = left > 6 ? `${left}%` : '6%'
        state.arrowLeft = `${left}%`
      }
    }, {
      immediate: true
    })

    return {
      color,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-ratio
  padding 20px 0 0
  height 100%
  .p-echart
    position relative
    padding 35px 0 25px
    border-bottom 1px solid #EAEBEE
    height 100%
    .p-cycle
      position absolute
      left 0
      top 0
      bottom 0
      margin-left -45px
      display flex
      justify-content center
      align-items center
      .p-cycle-inner
        width 100px
        height 100px
        border-radius 50%
        display flex
        justify-content center
        align-items center
        position relative
        z-index 999
        &:after
          content ""
          display block
          width 70px
          height 70px
          border-radius 50%
          background-color #fff
          position absolute
          top 15px
          left 15px
      .p-cycle-result
        z-index 999
        color #3B68F0
        font-size 16px
    .p-row-block
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      .p-row
        position absolute
        left 0
        right 0
        border-bottom 1px dashed #EAEBEE
      .p-row-1
        top 33.33%
      .p-row-2
        top 66.66%
    .p-col-block
      position absolute
      left 30px
      right 30px
      top 0
      bottom 14px
      .p-col
        position absolute
        top 0
        bottom 0
        border-right 1px dashed #EAEBEE
      .p-col-1
        left 0
      .p-col-2
        left 25%
      .p-col-3
        left 50%
      .p-col-4
        left 75%
      .p-col-5
        left 100%
.p-progress-bar
  width 100%
  height 14px
  display flex
  position absolute
  bottom 0
  .u-progress-li
    flex 1
    &-1
      background #B9E6FF
    &-2
      background #78B2FF
    &-3
      background #3B68F0
    &-4
      background #042DA8
    &-5
      background #FF3E3E
    .u-progress-li-label
      display flex
      justify-content space-between
      color #fff
      margin 0 5px
  .u-progress-arrow
    position absolute
    left 0
    top -8px
    width 0
    height 0
    border-left 6px solid transparent
    border-right 6px solid transparent
    border-bottom 8px solid #B9E6FF
</style>
