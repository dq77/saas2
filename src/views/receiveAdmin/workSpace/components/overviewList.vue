<template lang='pug'>
.overview-box
  .overview-box--li(:class='`${type}`' v-for='(item, index) in data' :key='index')
    .overview-box--li-value {{ item.isAmount ? toAmountStr(item.value, 2, true) : item.value.toLocaleString() }}
    .overview-box--li-name {{ item.name }}
  p(@click="route") 查看详情>
</template>

<script>
import { toAmountStr } from '@/utils/util'
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    type: String
  },
  setup (props, { emit }) {
    const route = () => {
      emit('route')
    }
    return {
      toAmountStr,
      route
    }
  }
}
</script>

<style lang='stylus' scoped>
.overview-box
  width 50%
  height 228px
  min-width: 200px
  margin-top 28px
  background #F8F9FA
  display flex
  flex-direction column
  justify-content center
  align-items center
  .overview-box--li
    width 110px
    margin-bottom 31px
    position relative
    &-value
      font-size 18px
      color #394D78
      font-weight bold
      line-height 22px
    &-name
      font-size 12px
      color #9AA6B8
      line-height 17px
    &:before
      content ''
      position absolute
      left -22px
      top 16px
      width 10px
      height 10px
      background #3BB5EF
    &:first-child:before
      background #3B68F0
    &.project:before
      background #FEBB27
    &.project:first-child:before
      background #FE9327
    &.other:before
      background #BF6FF9
    &.other:first-child:before
      background #7D6FF9
    &.credit:before
      background #3BB5EF
    &.credit:first-child:before
      background #3B68F0
  p
    color #3B68F0
    padding 0
    cursor pointer
</style>
