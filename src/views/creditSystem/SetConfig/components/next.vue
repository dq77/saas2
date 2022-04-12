<template lang="pug">
.next_box
  el-button(type="primary" :weblogs-anchor="`common-control-${nextData[nextKey] ? nextData[nextKey].next : ''}`" @click="nextHandle") 下一步，{{ nextData[nextKey] ? nextData[nextKey].title : '' }}
</template>
<script>
import { nextData } from './consts'

export default {
  props: {
    nextKey: String
  },
  setup(props, { root: { $router }, emit }) {
    const nextHandle = () => {
      const name = nextData[props.nextKey]?.name
      emit('nextHandle', props.nextKey)
      name && $router.push({ name: nextData[props.nextKey]?.name })
    }

    return {
      nextData,
      nextHandle
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
</style>
