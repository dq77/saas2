<template lang='pug'>
.graphic
  template(v-if='!isEmpty')
    .graphic-li(v-for='(item, index) in data' :key='index')
      img.graphic-icon(:src='item.icon')
      .graphic__content
        .graphic__content-name {{ item.name }}
        .graphic__content-value {{ item.isAmount ? toAmountStr(item.value, 2, true) : item.value.toLocaleString() }}
  Empty(v-else)
</template>

<script>
import Empty from '../components/empty'
import { toAmountStr } from '@/utils/util'
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    isEmpty: {
      type: Boolean,
      default: false
    }
  },
  emits: {},
  components: {
    Empty
  },
  setup (props) {
    return {
      toAmountStr
    }
  }
}
</script>

<style lang='stylus' scoped>
.graphic
  width 446px
  height 100%
  display flex
  flex-direction column
  align-items space-between
  justify-content center
  border-right 1px solid #EAEBEE
.graphic-li
  flex 1
  display flex
  justify-content space-between
  align-items center
  &:last-child .graphic__content
    border-bottom 0
.graphic-icon
  width 50px
  height 50px
.graphic__content
  height 100%
  padding-left 23px
  flex 1
  color #494949
  border-bottom 1px solid #EAEBEE
  display flex
  flex-direction column
  justify-content center
  &-name
    margin-bottom 3px
    font-size 12px
    line-height 17px
  &-value
    font-size 26px
    font-weight bold
    line-height 31px
</style>
