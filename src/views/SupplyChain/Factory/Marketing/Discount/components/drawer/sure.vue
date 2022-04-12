<template lang="pug">
.drawer-sure
  el-button(@click="cancleHandle") 取消
  el-button(type='primary' @click="sureHandle") 确定
</template>
<script lang='ts'>
export default {
  setup(props, { emit }) {
    // methods
    const cancleHandle = (): void => emit('cancleHandle', false)
    const sureHandle = (): void => emit('sureHandle')
    return {
      cancleHandle,
      sureHandle
    }
  }
}
</script>
<style lang="stylus" scoped>
.drawer-sure
  position fixed
  bottom 0
  width 44%
  left 56%
  height 60px
  background #FFFFFF
  box-shadow 0px -2px 6px 0px rgba(51, 75, 133, 0.2)
  border 1px solid #ECEDF1
  display flex
  align-items center
  justify-content center
  z-index 9
</style>
