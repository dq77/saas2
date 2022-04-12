<template lang="pug">
.next_box
  el-button(type='primary' :loading="loading" @click="sureHandle" v-if="!onlyBack") 保存
  el-button(@click="cancleHandle") 返回
</template>
<script>

export default {
  props: {
    loading: Boolean,
    onlyBack: Boolean
  },
  setup(props, { root: { $router }, emit }) {
    const sureHandle = () => emit('sureHandle')

    const cancleHandle = () => $router.back()

    return {
      sureHandle,
      cancleHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.next_box
  position: fixed
  left: 234px
  bottom: 0
  width: calc(100% - 264px)
  height: 60px
  background: #FFFFFF
  box-shadow: 0px -2px 6px 0px rgba(51, 75, 133, 0.2)
  border: 1px solid #ECEDF1
  display: flex
  align-items: center
  justify-content: center
  z-index 9
  min-width: 941px
</style>
