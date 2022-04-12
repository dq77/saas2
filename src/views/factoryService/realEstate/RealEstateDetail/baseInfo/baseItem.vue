<template lang="pug">
.p-base-info-content(v-if='dataSource')
  template(v-for='item in baseItems')
    //- 港股显示“董事长”，其余显示“公司法人”
    .p-base-info-content-item(v-if='checkMarket(item.market)')
      .p-content-item-label {{item.label}}
      .p-content-item-value
        span(v-if='dataSource && dataSource[item.prop]') {{dataSource[item.prop]}}
        span(v-else) -
    .p-base-info-line(v-if='checkMarket(item.market)')
</template>

<script>
import { baseColumns } from '../config'
import { reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const state = reactive({
      baseItems: baseColumns,
    })

    const checkMarket = (market) => {
      return !market || market.join().indexOf(props.dataSource.market) > -1
    }

    return {
      checkMarket,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-base-info-content
  margin-top -50px
  .p-base-info-content-item
    display flex
    height 50px
    line-height 50px
    width 320px
    font-size 16px
    font-weight bold
    .p-content-item-label
      font-size 14px
      width 100px
      font-weight normal
  .p-base-info-content-item:last-child
    margin-bottom 0
  .p-base-info-line
    background linear-gradient(to right, #4E7BBF, #4F7ABE)
    opacity 0.5
    width 70%
    height 1px
  .p-base-info-line:last-child
    background none
</style>
