<template lang="pug">
.quit-enter
  //- .block-card(v-for='(item, i) in configData' :key='i' :style='{background: item.background}' :class='{"bg": item.isHover }' @mouseenter='itemover(item, i)' @mouseover='itemout(item, i)')
  .block-card(v-for='(item, i) in configData' :key='i' :style='{background: item.background}' @mouseleave='itemout'  @mouseenter='itemover(item)')
    .block-card-bg(:class='item.isHover ? `bg bg${i+1}` : ""')
    .block-card-inner
      .block-card-title
        span {{item.title}}
      .block-card-content
        span {{item.content}}
      .block-card-oprate
        el-button(type='plain' @click.stop='createHandle(item)') 点击发起
</template>

<script>
import { toRefs, reactive } from '@vue/composition-api'
export default {
  props: {
    configData: {
      type: Array,
      default: () => []
    }
  },
  setup(props, {emit}) {
    const state = reactive({
      configDataProp: props.configData
    })
    const createHandle = (blockData) => {
      emit('createHandle', blockData)
    }
    const itemover = (item) => {
      state.configDataProp.forEach((value, key) => {
        if (item._id === value._id) {
          value.isHover = true
        }
      })
    }
    const itemout = () => {
      state.configDataProp.forEach((value, key) => {
        value.isHover = false
      })
    }
    return {
      createHandle,
      itemover,
      itemout,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="stylus" scoped>
.quit-enter
  display flex
  .block-card
    flex 1
    margin-left 20px
    position relative
    &:first-child
      margin-left 0
    .block-card-inner
      padding 22px 20px
      position relative
      z-index 1
    .block-card-bg
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      background-size auto 100%
.block-card-title
  font-size 14px
  font-weight 500
.block-card-content
  height 34px
  color #848484
.bg
  pointer-events none
  transition all .3s linear
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  background-size auto 100%
.bg1
  background url('//cdn.qjdchina.com/static-online/saas/SupplyChain/orderMaster/workbench-1.png') 0 100% no-repeat
.bg2
  background url('//cdn.qjdchina.com/static-online/saas/SupplyChain/orderMaster/workbench-2.png') 0 100% no-repeat
.bg3
  background url('//cdn.qjdchina.com/static-online/saas/SupplyChain/orderMaster/workbench-3.png') 0 100% no-repeat
.bg4
  background url('//cdn.qjdchina.com/static-online/saas/SupplyChain/orderMaster/workbench-4.png') 0 100% no-repeat
</style>
